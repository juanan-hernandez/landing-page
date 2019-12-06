# landing-page
Landing page made with Angular and Bootstrap and uploaded into an EC2 instance from AWS
It also provides:
- Multilingual configuration (Angular i18n standardization)

### Real example
http://34.244.221.61/

## 1. Prerequisites
#### Update your Ubuntu packages
```
sudo apt-get update
sudo apt upgrade
```
#### Git 
```
sudo apt-get install -y git
```
#### NPM & NodeJS
```
sudo apt-get install -y npm
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```
#### We will use ngnix server for this setup (both in local and remote)
###### **nginx** is  a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache
```
sudo apt-get install -y nginx
```

## 2. Local execution
### 2.1. Pull the code from the repo and install dependencies
```
git clone https://github.com/juanan-hernandez/landing-page.git
cd landing-angular
npm install 
sudo npm install -g @angular/cli
npm update
```
### 2.2. Serve the web (default localhost:4200) 
```
ng serve
```

## 3. Local server deploy
### 3.1. Local build. 
#### Note below that we are going to build the app in 2 different paths, based on the 2 languages we are working with. 
```
npm run build-locale
```
### 3.2. Copy the generated dist/ folder into the following path:
```
sudo mkdir /var/www/landing-angular
cp /your/local/path/landing-angular/dist /var/www/landing-angular/
``` 
### 3.3. Configure ngnix
#### We are going to create a new file /etc/nginx/conf.d/sample.conf with following code inside it.
```
server {
    listen 80;
    listen [::]:80;
    server_name localhost;
    index index.html index.htm;

    location /es/ {
        alias /var/www/landing-angular/dist/es/;
        try_files $uri$args $uri$args/ /es/index.html;
    }

    location /en/ {
        alias /var/www/landing-angular/dist/en/;
        try_files $uri$args $uri$args/ /en/index.html;
    }

    # Default to ES
    location / {
        alias /var/www/landing-angular/dist/es/;
        try_files $uri$args $uri$args/ /es/index.html;
    }

}
```
### 3.4. Restart nginx server
```
sudo service nginx restart
```
### 3.5. Go to web browser -> localhost:80 and check whether your site is working or not
#### (*) If you have any issue with nginx, (500, 403, ... errors), take a look to the logs to figure out the concrete reason
```
sudo tail -f /var/log/nginx/error.log
```

## 4. AWS deployment
#### Once we get the website working in our local environment, let's move it to the AWS EC2 service
### 4.1. AWS connection
Assuming an EC2 instance has been created with Ubuntu 16.02+ and you have correctly downloaded the public certificate (.pem) to access through ssh to it, you can continue with the following steps:<br/>
(*) If you need more information, have a look to AWS documentation (https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html)

### 4.2. Copy your rsa public key into a clipboard
If you do not have a generated key, run the following command and let all the input fields empty:
```
ssh-keygen
```
Then, you can get access to the content
```
cat ~/.ssh/id_rsa.pub
```
### 4.3. Connecting through SSH into the machine
```
ssh -i "yourKey.pem" ubuntu@XXX-XXX-XXX.compute.amazonaws.com
```
### 4.4. As in your local environment, install nginx
```
sudo apt-get install -y nginx
```
### 4.5. Add your local rsa public key to the list of authorized keys (paste the content of 3.2.)
```
vim ~/.ssh/authorized_keys
```
### 4.6. Create the folder where you will put the compiled code on
```
sudo mkdir /var/www/landing-angular
```
### 4.7. Exit from the AWS machine and run the following command in your local machine:
```
scp /your/local/path/landing-angular/dist ubuntu@XXX-XXX-XXX.compute.amazonaws.com:/var/www/landing-angular
```
### 4.8. Enter again into the AWS machine and repeat the steps 3.3. and 3.4. 
(*) Note that in the configuration file now the server_name has to be replaced by your AWS machine public IP
```
    listen [::]:80;
    server_name PUBLIC_IP;
    index index.html index.htm;
```
### 4.9. You should be able to see whether your site is correctly displayed by accessing your AWS public IP from the web browser.  


# Scaling up the project...

## Add new components to the project
```
ng generate component COMPONENT-NAME
```
