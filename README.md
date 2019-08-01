# landing-page
Landing page made with Angular and Bootstrap and uploaded into an EC2 instance from AWS

## Real example
http://34.244.221.61/

# Instructions
```
git clone https://github.com/juanan-hernandez/landing-page.git
cd landing-angular
npm install 
```

## Local execution
```
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

### Configure ngnix
```
cd /etc/nginx/sites-available
```

### Create a file with the site name
```
sudo vim landing-page
```

### Update this with the below content
```
server {     
    listen 80;      
    listen [::]:80;      
    server_name <public_ip>;      
    root /var/www/landing-page/dist/landing-page;   
    server_tokens off;   
    index index.html index.htm;     
 
    location / {         
        # First attempt to server request as file, then         
        # as directory, then fall back to displaying a 404.          
        try_files $uri $uri/ /index.html =404;      
    }
}
```

### Create a link in another directory
```
cd /etc/nginx/sites-enabled 
sudo ln -s ../sites-available/landing-page
ls -l
```

### Pull the code from the repo
```
cd /var/www
git clone https://github.com/juanan-hernandez/landing-page.git
cd /var/www/landing-angular
npm install
ng build --prod
```

### Restart ngnix server
```
sudo nginx -s reload
```
