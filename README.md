# VirtualCourses - Online Learning Platform

A full-stack web application for online course management with separate educator and student roles.

## 🚀 Features

- User authentication (signup, login, Google auth)
- Role-based access (Student/Educator)
- Course creation and management
- Lecture creation and management
- Course enrollment and payment integration (Razorpay)
- Review and rating system
- AI-powered course search
- Profile management with image upload
- Password reset functionality
- Responsive design

## 🛠️ Tech Stack

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image storage
- Nodemailer for email services

**Frontend:**
- React with Vite
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Cloudinary account
- Email service (Gmail with app password)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd VirtualCourses
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Copy the example environment file and configure your credentials:
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Update `backend/.env` with your actual values:
   ```
   PORT=8000
   MONGODB_URL="your_mongodb_connection_string"
   JWT_SECRET="your_secure_jwt_secret"
   USER_EMAIL="your_email@gmail.com"
   USER_PASSWORD="your_gmail_app_password"
   CLOUDINARY_NAME="your_cloudinary_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   ```

## 🚀 Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:8000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## 📁 Project Structure

```
VirtualCourses/
├── backend/
│   ├── config/          # Database, Cloudinary, email configs
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication, file upload
│   ├── model/          # MongoDB schemas
│   ├── route/          # API routes
│   └── index.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── Component/   # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── redux/       # State management
│   │   └── customHooks/ # Custom React hooks
│   └── public/         # Static assets
└── README.md
```

## 🔐 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable secure cookies in production environment
- Regularly update dependencies

## 📝 API Endpoints

**Authentication:**
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/logout` - User logout
- POST `/api/auth/googleauth` - Google authentication

**User Management:**
- GET `/api/user/getCurrentuser` - Get current user
- POST `/api/user/profile` - Update user profile

**Course Management:**
- POST `/api/course/create` - Create new course
- GET `/api/course/getPublished` - Get published courses
- GET `/api/course/getCreator` - Get creator's courses
- GET `/api/course/getCourse/:courseId` - Get course by ID
- POST `/api/course/editCourse/:courseId` - Edit course
- DELETE `/api/course/remove/:courseId` - Delete course
- POST `/api/course/creator` - Get creator by ID

**Lectures:**
- POST `/api/course/createlecture/:courseId` - Create lecture
- GET `/api/course/courselecture/:courseId` - Get course lectures
- POST `/api/course/editlecture/:lectureId` - Edit lecture
- DELETE `/api/course/removelecture/:lectureId` - Delete lecture

**Reviews:**
- POST `/api/review/createreview` - Create review
- GET `/api/review/getreview` - Get reviews

**Payments:**
- POST `/api/payment/razorpay-order` - Create Razorpay order
- POST `/api/payment/verifypayment` - Verify payment

**Search:**
- POST `/api/course/search` - Search courses with AI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.