# devopsproject

Subject: This project was created for the DSTI DevOps class project assignment. 
Author: Nathalie Descusse-Brown
Created: 9th May 2022
Updated: 9th July 2022

## Project goals

The goals of the project are to cover the following aspects:
### 1. Create a web application
### 2. Apply CI/CD pipeline
### 3. Configure and provision a virtual environment and run your application using the IaC approach
### 4. Build Docker image of your application
### 5. Make container orchestration using Docker Compose
### 6. Make docker orchestration using Kubernetes
### 7. Make a service mesh using Istio
### 8. Implement Monitoring to your containerized application
### 9. Document your project


## Environment

OS: Windows 11 Home/Pro
Linux SubSystem: WSL
VM: First Ubuntu Desktop 20.04.4 LTS until machine crashed, then replaced by Vagrant Centos/7.
Vagrant: v2.2.6
Node.js: v14.19.2
redis: v3.1.2

## 1. Create a web application

The application created is a database of running records for most common race distances for men and women categories.

The application connects to Redis database and has the following functionalities:
- Search records
- Add record
- Delete record

The application follows the MVC model, with the index.js being the main file and the controller and router being found in the controllers and routes folders respectively.

Automatic tests for the application were added to cover the following:
- configuration 
- connection
- API

Unit tests as such were not created as I couldn't figure out how to do them with my controller definition.

## 2. Apply CI/CD pipeline

GitHub Actions was used to deploy the model to Heroku, and the fully functioning app can be found at the following url: 
[RunningRecords](https://runningrecords.herokuapp.com/)

![My_Heroku_app_home](images/heroku_homepage.jpg)

## 3. Configure and provision a virtual environment and run your application using the IaC approach

I then set up Vagrant in order to launch a VM to run my app. 

Because of the issue with the below, I tried another approach and ended up succesfully running vagrant with Windows Powershell.

I followed the following steps:
1. Launch wsl from Powershell
2. Navigate to my iac folder (in my instance via ```cd C:\Users\natha\DSTI\DevOps\devopsproject\iac```)
3. Configure vagrant for wsl by running the following commands:
	- export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1" export
	- PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox" export
	- VAGRANT_WSL_WINDOWS_ACCESS_USER_HOME_PATH=/mnt/c/users/natha/DSTI/DevOps/devopsproject/runningrecords
4. Create vagrant box: ```vagrant box add centos/7```
5. Initialise vagrant: ```vagrant init centos/7```
6. Customize the Vagrantfile to make use of synced folder (to sync with my runningrecords app folder), run Ansible locally and make use of Ansible playbooks.
7. Launch vagrant VM: ```vagrant up```
8. I modified my playbooks each in turn to install node.js and redis and deploy app. Everytime I finished with a playbook I used the command ```vagrant upload playbooks /vagrant/playbooks app_server to update playbooks``` on vagrant, followed by ```vagrant provision```


![Ansible_provisioning](images/Ansible_provisioning2.jpg)

![Ansible_runningapp](images/Ansible_runningapp)

![Ansible_runningapp2](images/Ansible_runningapp2)

## 4. Build Docker image of your application

I wrote a Dockerfile enabling me to run my app on port 3000 (which is the port node.js runs on)

The Dockerimage was built from the location of the Dockerfile (within my runningrecords app folder) with the following command:

```docker build -t runningrecords .```

![Docker_build](images/docker_build.jpg)

## 5. Make container orchestration using Docker Compose

## 6. Make docker orchestration using Kubernetes

## 7. Make a service mesh using Istio

## 8. Implement Monitoring to your containerized application

##9. Issues encountered

# When running vagrant

I followed the following steps to run vagrant from Ubuntu 20.04.4 LTS from Windows 11:
1. Launch Ubuntu for Windows
2. Navigate to my iac folder (in my instance via **cd /mnt/c/users/natha/DSTI/DevOps/devopsproject/iac**)
3. Configure vagrant for wsl by running the following commands:
	- export VAGRANT_WSL_ENABLE_WINDOWS_ACCESS="1" export
	- PATH="$PATH:/mnt/c/Program Files/Oracle/VirtualBox" export
	- VAGRANT_WSL_WINDOWS_ACCESS_USER_HOME_PATH=/mnt/c/users/natha/DSTI/DevOps/devopsproject/runningrecords
4.	Add vbgust plugin: *vagrant plugin install vagrant-vbguest*
5.  Create vagrant box: *vagrant box add centos/7*
6.  Initialise vagrant: *vagrant init centos/7*
7.  Launch vagrant VM: *vagrant up*, but this is when I encountered the below issue.

Issue:
I got this error message in the console when running *vagrant up*:
**There are errors in the configuration of this machine. Please fix
the following errors and try again:**

**vm:
* **The host path of the shared folder is not supported from WSL. Host
path of the shared folder must be located on a file system with
DrvFs type. Host path: mnt/c/users/natha/DSTI/DevOps/devopsproject/runningrecords/**

My node.js app is location in folder:  C:/users/natha/DSTI/DevOps/devopsproject/runningrecords/

The issue has been reported to the Adaltas repo: [issue in Adaltas repo](https://github.com/adaltas/dsti-devops-2022-spring/issues/4)

Resolution: I switched from Ubuntu to wsl on Powershell and outcome is described in Section 3.