# Blog Platform

This project is a simple blog platform built with a React front-end and an Express back-end using MongoDB for data storage.

## 1. Run Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, you'll need to install the following software:

- [Node.js and npm](https://nodejs.org/en/download/): JavaScript runtime and package manager
- [MongoDB](https://www.mongodb.com/try/download/community): NoSQL database

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url
cd blog-platform
```

2. Install NPM packages for the back-end server:

```bash
cd backend
npm install
```

3. Install NPM packages for the front-end client:

```bash
cd ../frontend
npm install
```

### Running MongoDB

Ensure MongoDB is running locally on its default port (27017).

If you have installed MongoDB as a service, it should be running automatically. Otherwise, you can start it manually:

```bash
mongod
```

### Running the Back-End Server

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Start the server:

```bash
npm start
```

Your back-end server should now be running on `http://localhost:5000`.

### Running the Front-End React App

1. Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

2. Start the React development server:

```bash
npm start
```

Your front-end should now be running on `http://localhost:3000` and should automatically open in your default web browser.

### Environment Variables

For the back-end server, if you wish to set environment variables, you can create a `.env` file in the `backend` directory and set your variables there:

```env
MONGO_URI=mongodb://your-custom-mongodb-uri
MONGO_DB_NAME=your-custom-db-name
PORT=your-preferred-port
```

For the front-end, if you need to set environment variables, create a `.env` file in the `frontend` directory.

### File Uploads

By default, uploaded files are stored in the `uploads` directory within the `backend` directory. If you're using an environment variable to set the uploads directory, make sure the specified directory exists and is writable.

## Built With

- [React.js](https://reactjs.org/) - The front-end library used
- [Express.js](https://expressjs.com/) - The back-end framework used
- [MongoDB](https://www.mongodb.com/) - The database used

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

create the app:
npx create-react-app blog-platform

npm install

test app:
cd blog-platform
npm start

create the backend
mkdir backend cd in it
npm init -y
npm install express mongoose cors

create models with Post.js

create routes with posts.js

create server.js

to start the backend server which connect to the database and show the posts id in the database
npm start

setup proxy to let frontend communicate withe the backend server and display the posts from the database

npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
