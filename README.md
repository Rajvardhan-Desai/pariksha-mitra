# Pariksha Mitra

[https://pariksha-mitra6q86.onrender.com/
](https://pariksha-mitra-6q86.onrender.com/)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

## Technologies Used

### Frontend

- **React** with **Vite**: For fast and efficient development.
- **Material UI (MUI)**: For building responsive and modern user interfaces.
- **React Router DOM**: For client-side routing.
- **Axios**: For making HTTP requests to the backend APIs.

### Backend

- **Node.js** with **Express**: For building the server and handling API routes.
- **MongoDB** with **Mongoose**: For database management and object modeling.
- **JWT (JSON Web Tokens)**: For secure authentication.
- **Bcrypt**: For hashing user passwords.
- **Cors**: For handling Cross-Origin Resource Sharing.


## Installation

### Backend Setup

1. **Navigate to the `server` directory:**

   ```bash
   cd server

2. **Install backend dependencies:**

   ```bash
   npm install

3. **Create a `.env` file in the `server` directory**

   ```bash
   MONGODB_URI=mongodb_uri
   JWT_SECRET=your_jwt_secret_key
   PORT=5000

  - MONGODB_URI: Your MongoDB connection string.
  - JWT_SECRET: A secret key for JWT token generation.
  - PORT: The port on which the backend server will run.
  
  
4. **Start the backend server in development mode:**

   ```bash
   npm run dev

  The backend server will start on `http://localhost:5000.`
  
### Frontend Setup

  1. **Navigate to the `client` directory:**

      ```bash
     cd client
      
  2. **Install frontend dependencies:**

     ```bash
     npm install
  3. **Create a `.env` file in the `client` directory:**

     ```bash
     VITE_API_URL=backend_url
     
  4. **Start the frontend development server:**

      ```bash
      npm run dev
      
  The frontend will be available at `http://localhost:5173.`
