# landing-page
Landing page made with Angular and Bootstrap and uploaded into an EC2 instance from AWS

### Real example
http://34.244.221.61/

## Local execution
```
git clone https://github.com/juanan-hernandez/landing-page.git
cd landing-angular
npm install 
ng serve
```

## Server execution
### AWS connection
Assuming an EC2 instance has been created with Ubuntu 16.02+

### Connecting through SSH into the machine
```
ssh -i "yourKey.pem" ubuntu@XXX-XXX-XXX.compute.amazonaws.com
```

### Update your Ubuntu packages
```
sudo apt-get update
sudo apt upgrade
```

### Install git to pull your code
```
sudo apt-get install -y git
```

### Install npm and nodejs
```
sudo apt-get install -y npm
sudo apt-get install -y nodejs
```

### Update npm
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### We will use ngnix server for this setup
**nginx** is  a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache
```
sudo apt-get install -y nginx
```

### Next, install Angular CLI, needed to run Angular services.
```
sudo npm install -g @angular/cli
```

### Pull the code from the repo and build it 
### Note below that we are going to build the app in 2 different paths, based on the 2 languages we are working with. 
```
cd /var/www
git clone https://github.com/juanan-hernandez/landing-page.git
cd /var/www/landing-angular
npm install
ng build:locale
```

### If needed, check below whether your dist path corresponds with the generated dist path.
### In my case it is going to be created in the path 
```
/var/www/landing-angular/dist
```

### Configure ngnix
### We are going to create new files /etc/nginx/conf.d/sample.conf with following code inside it.

```
server {
    listen 80;
    listen [::]:80;
    server_name PUBLIC_IP;
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

### Restart nginx server
```
sudo service nginx restart
```

# Scaling up the project...

## Add new components to the project
```
ng generate component COMPONENT-NAME
```
