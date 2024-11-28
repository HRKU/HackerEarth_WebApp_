
HackerEarth_WebApp_
HackerEarth JetBrains Competition / Bakery Web App

Welcome to the Baker.co Web App, an online bakery management system! This application demonstrates a full-stack MEAN (MongoDB, Express.js, Angular, Node.js) implementation.

Overview
This project was created as part of the HackerEarth JetBrains Competition. It showcases a functional web application for managing a bakery, including product listings and basic backend API integrations.

Prerequisites
Before starting, ensure your development environment has the following installed:

Git

Download & Install Git.
Check if Git is installed:
bash
Copy code
git --version
Node.js and npm

Download & Install Node.js.
Confirm installation:
bash
Copy code
node -v
npm -v
MongoDB

Download & Install MongoDB.
Ensure it is running on the default port 27017.
Installation
Clone the Repository
Clone the project repository to your local machine:

bash
Copy code
git clone https://github.com/HRKU/HackerEarth_WebApp_.git
Alternatively, you can download the repository as a ZIP file and extract it.

Install Dependencies
Navigate to the project directory and install the necessary dependencies:

bash
Copy code
npm install
This command will:

Install both production and development dependencies.
Automatically run bower install (if using Bower for front-end dependencies).
Run the Application
Start the Frontend
Run the Angular frontend:

bash
Copy code
ng serve
The frontend will be available at http://localhost:4200.

Start the Backend
Run the Node.js backend:

bash
Copy code
node app.js
The backend will be available at http://localhost:3100.

Ensure both servers are running simultaneously for the application to function locally.

Folder Structure
Here’s an overview of the project structure:

bash
Copy code
HackerEarth_WebApp_  
│  
├── backend/          # Backend code (Node.js + Express)  
├── frontend/         # Frontend code (Angular)  
├── uploads/          # Uploaded images and assets  
├── package.json      # Backend dependencies  
├── angular.json      # Angular project configuration  
└── README.md         # Project documentation  
Configuration
Development Environment:
Configure environment variables or review config/env/development.js for backend-specific settings.

Connecting to MongoDB:
Ensure MongoDB is running on localhost:27017. You can update connection details in your backend configuration file if needed.

Troubleshooting
CORS Issues

Ensure the backend API includes the necessary Access-Control-Allow-Origin headers.
Images Not Displaying

Verify the photoByPath field in the backend response matches the correct file paths.
Dependency Errors

If npm install fails, delete node_modules and try again:
bash
Copy code
rm -rf node_modules  
npm install  
Future Improvements
Implement a more modern UI with better styling.
Optimize API routes for scalability and performance.
Host the backend on a reliable free-tier service like Render or Fly.io.
Add advanced features like user authentication, order tracking, and payment integration.
Acknowledgments
Special thanks to Reet Khanchandani for being an amazing teammate during this project.

Feel free to suggest further improvements or contribute to this project!
