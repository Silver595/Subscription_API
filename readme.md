# 🚀 Subscription API

## 📌 Overview
This **Subscription Management API** provides a robust system for handling user subscriptions. It allows users to create, retrieve, update, and delete subscriptions while ensuring security with **ArcJet middleware** and **Upstash QStash**.

## ✨ Features
- 🔒 **Secure User Authentication & Authorization** with JWT
- 📜 **Comprehensive Subscription Management** (CRUD operations)
- 🛡 **Enhanced Security** with ArcJet Protection
- 🚦 **Rate Limiting & Bot Detection**
- 🗄 **Seamless Database Integration** using MongoDB & Mongoose

## 🛠 Tech Stack
- 🏗 **Backend**: Node.js & Express.js
- 🗃 **Database**: MongoDB with Mongoose ORM
- 🔑 **Authentication**: JWT (JSON Web Token)
- 🛡 **Security Layer**: ArcJet Middleware
- ⏳ **Task Queue Handling**: Upstash QStash

## ⚙️ Installation

To set up the project, follow these steps:
```sh
# Clone the repository
$ git clone https://github.com/Silver595/Subscription_API.git
$ cd subscription-api

# Install dependencies
$ npm install
```

## 📝 Configuration
Create a `.env.local` file in the project root and define the following environment variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
UPSTASH_QSTASH_URL=your_upstash_qstash_url
UPSTASH_QSTASH_TOKEN=your_upstash_qstash_token
```

## ▶️ Running the Server
To launch the API, use the following commands:
```sh
# Start the server
$ npm start

# Start the server in development mode with auto-reloading
$ npm run dev
```

The API will be accessible at **http://localhost:5000**.

## 🔐 Security & Middleware
- 🛡 **ArcJet** safeguards the API against attacks, bot traffic, and rate limit violations.
- ⏳ **Upstash QStash** manages background tasks and message queues efficiently.

## 🔄 API Usage
Use an HTTP client (Postman, cURL, or browser) to interact with the API at **http://localhost:5000**.

## 🔗 Useful Resources
- 🌐 [ArcJet](https://launch.arcjet.com/4g2R2e4)
- 💾 [Upstash](https://bit.ly/42ealiN)
- 🏠 [Hostinger](https://hostinger.com/mastery10)

## 📜 License
This project is released under the **MIT License**.

