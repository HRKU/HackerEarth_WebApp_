# HackerEarth_WebApp_
HackerEarth JetBrains Competition / Bakery Web App

Welcome to the Baker.co Web-app 
 


Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:

MongoDB - Go through MongoDB Official Website and proceed to their Official Manual, which should help you understand NoSQL and MongoDB better.
Express - The best way to understand express is through its Official Website, which has a Getting Started guide, as well as an ExpressJS guide for general express topics. You can also go through this StackOverflow Thread for more resources.
AngularJS - Angular's Official Website is a great starting point. You can also use Thinkster Popular Guide, and Egghead Videos.
Node.js - Start by going through Node.js Official Website and this StackOverflow Thread, which should get you going with the Node.js platform in no time.
Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

Git - Download & Install Git. OSX and Linux machines typically have this already installed.
Node.js - Download & Install Node.js and the npm package manager. If you encounter any problems, you can also use this GitHub Gist to install Node.js.
MongoDB - Download & Install MongoDB, and make sure it's running on the default port (27017).

Cloning The GitHub Repository
The recommended way to get MEAN.js is to use git to directly clone the MEAN.JS repository:

$ git clone https://github.com/HRKU/HackerEarth_WebApp_.git
This will clone the latest version of the MEAN.JS repository to a meanjs folder.

Downloading The Repository Zip File
Another way to use the MEAN.JS boilerplate is to download a zip copy from the master branch on GitHub. You can also do this using the wget command:

$ wget https://github.com/meanjs/mean/archive/master.zip -O meanjs.zip; unzip meanjs.zip; rm meanjs.zip
Don't forget to rename mean-master after your project name.


Quick Install
Once you've downloaded the boilerplate and installed all the prerequisites, you're just a few steps away from starting to develop your MEAN application.

The boilerplate comes pre-bundled with a package.json and bower.json files that contain the list of modules you need to start your application.

To install the dependencies, run this in the application folder from the command-line:

$ npm install
This command does a few things:

First it will install the dependencies needed for the application to run.
If you're running in a development environment, it will then also install development dependencies needed for testing and running your application.
When the npm packages install process is over, npm will initiate a bower install command to install all the front-end modules needed for the application
To update these packages later on, just run npm update
Running Your Application
Run your Front-End Angular using ng serve:

$ ng serve
Your front-end should run on port 4200 with the development environment configuration, so in your browser just go to http://localhost:4200

Run your Back-End Node.js server using node app.js:

Your backend should run on port 3100 i.e http:// localhost:3100 with the development environment configuration.

Make sure that both the servers are up and running for it to run locally.

That's it! Your application should be running. To proceed with your development, check the other sections in this documentation. If you encounter any problems, try the Troubleshooting section.

Explore config/env/development.js for development environment configuration options.


Thanking Reet Khanchandani for being such Good Teammate
