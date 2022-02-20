# Employment Management System


### Setup
* Clone the project from the github
* Create .env file from the .env.copy file within the server directory and paste the environment variables that will be given by the author
* Open two windows from your terminal
* Navigate to the server directory with one of the terminal window and with the other terminal window navigate to client directory
* Run npm install from both of these terminal windows
* After packages are installed, you can run npm start from both terminal windows to run the frontend and backend
* You can run npm test from both of the server and client terminal windows to run the tests
* The app runs from the browser: localhost:3000 port
* The backend runs from the localhost:5000 port
* IMPORTANT NOTE: Both frontend and backend should run at the same time so that the app works
* localhost:3000/login is the beginning route to sign in.

### Features:

* An admin can be register from the registered page so that that admin can use the portal
* When admin is registered, email and password fields are required
* Admin can login to system
* Admin can add new employee data
* Admin can edit and delete employee data
* Admin can list and filter employee data

### Tech Stack:

* Frontend: React, TypeScript, Redux, Material UI
* Backend: TypeScript, Node, Express Rest API
* Database: MongoDB
* Redux was used for the app-wide state management to store the token and keep track of logged in user
* useState was used to keep track of states within components



### Screenshots

![Login](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.18.01%20PM.png?raw=true)
<br/>
![Register](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.18.09%20PM.png?raw=true)
<br/>
![Portal](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.18.32%20PM.png?raw=true)
<br/>
![Search Name](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.18.43%20PM.png?raw=true)
<br/>
![Add Employee](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.18.50%20PM.png?raw=true)
<br/>
![Database Admin Sample](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.20.00%20PM.png?raw=true)
<br/>
<br/>
![Database Employee Sample](https://github.com/kutluduman/ems/blob/main/assets/Screen%20Shot%202022-02-20%20at%203.19.55%20PM.png?raw=true)
<br/>



