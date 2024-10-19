# Job Board

## Overview
The Job Posting Board is a full-stack application that enables companies to register, verify their accounts, post job listings, and communicate with candidates through automated email notifications. This project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and includes features such as user registration, email verification, job posting management, and email automation with Nodemailer.

Follow the steps below to set it up locally.

## TechStack
ReactJs
Typescript
Nodejs
Express
MongoDB

## Prerequisites
- Node.js (v14 or higher)
- Docker
- Git

## Getting Started

### 1. Clone the Repository
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

### Backend
cd server/
### 2.Run MongoDB Using Docker
docker pull mongo
docker run --name mongodb -d -p 27017:27017  mongo

### 3.Configure Environment Variables
MONGO_URL="mongodb://yourusername:yourpassword@localhost:27017/yourdbname"
JWT_SECRET="your_jwt_secret"
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_email_password"
TWILIO_SID="your_twilio_sid"
TWILIO_AUTH_TOKEN="your_twilio_auth_token"
TWILIO_VERIFY_SERVICE_SID="your_twilio_service_id"

# Twilio Services 
- Signup and Register for Twilio
- In console get these values TWILIO_SID and TWILIO_AUTH_TOKEN
- upon registering for Twilio verify Services,get TWILIO_VERIFY_SERVICE_SID

# Gmail Services
- Create App Password for nodemailer Service and store in EMAIL_PASS

### 4. Install Dependencies
npm install

### 5. Run the Application
npm run dev

Then Server runs in 3000

### Frontend

cd client
npm install
npm run dev

Then client runs in 5173





