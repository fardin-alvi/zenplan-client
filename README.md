# ZenPlano - Task Management System

ZenPlano is a real-time task management system with drag-and-drop functionality. Users can add, update, and manage tasks in different categories. The system supports real-time updates via **Socket.io** and filters tasks based on the logged-in user.

## 🚀 Live Demo
https://taskzen-1492d.web.app

## 📌 Features
- User authentication (Only see your own tasks)
- Create, edit, and delete tasks
- Drag-and-drop task management
- Real-time updates using Socket.io
- Task sorting based on categories

## 🛠 Technologies Used
- **Frontend:** React, Tailwind CSS, React Query, Material UI, React DnD
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Real-time Updates:** Socket.io
- **Authentication:** Firebase (if applicable)

## 📦 Dependencies
Make sure you have **Node.js** and **MongoDB** installed before proceeding.

### Backend Dependencies
```json
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "mongodb": "^5.6.0",
  "socket.io": "^4.7.2"
}
```

### Frontend Dependencies
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dnd": "^16.0.1",
  "react-dnd-html5-backend": "^16.0.1",
  "@mui/material": "^5.13.4",
  "@tanstack/react-query": "^5.0.0",
  "axios": "^1.6.5",
  "react-hot-toast": "^2.4.1"
}
```

## 📥 Installation Guide

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/fardin-alvi/zenplano.git
cd zenplano
```

### 2️⃣ Backend Setup
```sh
cd server
npm install
```
- Create a `.env` file and add:
  ```env
  PORT=5000
  DB_USER=yourMongoUser
  DB_PASS=yourMongoPass
  ````
- Start the server:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd client
npm install
npm run dev
```

The app should now be running at **http://localhost:5173** 🚀



