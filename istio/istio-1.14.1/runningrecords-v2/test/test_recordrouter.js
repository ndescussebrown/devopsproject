const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

chai.use(chaiHttp)


describe('Running Records REST API', () => {

    beforeEach(() => {
        // Clean DB before each test
        db.flushdb()
    })

    after(() => {
        app.stop();
        db.quit()
    })

    describe('POST /record/add', () => {

        it('create or update a record', (done) => {
            const record = {
                id : 'record004',
                distance: 'women 10k',
                first_name: 'Nathalie',
                last_name: 'Descusse-Brown',
                time: '30:00:00',
                year: '2022',
                location: 'Boston'
            }
            chai.request(app)
                .post('/record/add')
                .send(record)
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('pass wrong parameters', (done) => {
            const record = {
                distance: 'women 10k',
                first_name: 'Nathalie',
                last_name: 'Descusse-Brown',
                time: '30:00:00',
                year: '2022',
                location: 'Boston'
            }
            chai.request(app)
                .post('/record/add')
                .send(record)
                .then((res) => {
                    chai.expect(res).to.have.status(400);
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })
    })

    describe('POST /record/search', () => {

        it('search a record that exists', (done) => {
            const record = {
                id: 'record004',
                distance: 'women 10k',
                first_name: 'Nathalie',
                last_name: 'Descusse-Brown',
                time: '30:00:00',
                year: '2022',
                location: 'Boston'
            }

            chai.request(app)
                .post('/record/add')
                .send(record)
                .then(done())

            chai.request(app)
                .post('/record/search')
                .send(record)
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('search a record that doesnt exists', (done) => {
            const record = {
                id: 'record100',
            }
            chai.request(app)
                .post('/record/search')
                .send(record)
                .then((res) => {
                    chai.expect(res).to.have.status(201);
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('pass wrong parameters', (done) => {
            const record = {
                distance: 'women 10k',
            }
            chai.request(app)
                .post('/record/search')
                .send(record)
                .then((err) => {
                    chai.expect(err).to.not.be.equal(null)
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })
    })

    describe('POST /record/delete', () => {

        it('delete a record', (done) => {
            const record = {
                id: 'record004',
                distance: 'women 10k',
                first_name: 'Nathalie',
                last_name: 'Descusse-Brown',
                time: '30:00:00',
                year: '2022',
                location: 'Boston'
            }

            chai.request(app)
                .post('/record/add')
                .send(record)
                .then(done())

            chai.request(app)
                .post('/record/delete/:id')
                .send(record)
                .then((res) => {
                    chai.expect(res).to.have.status(200);
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

    })

})

