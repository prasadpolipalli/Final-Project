# 📋 Complete VisioMark Attendance System Setup Guide

## ✅ System Status: FULLY OPERATIONAL

This guide covers the **complete working setup** of the VisioMark Attendance System with AI-powered face recognition.

---

## 🎯 Project Overview

**VisioMark** is a web-based attendance system using:
- 🔐 AI-powered face recognition with encrypted embeddings
- 🎯 Role-based access (Admin, Teacher, Student)
- 📊 Attendance tracking and reporting
- 🔒 JWT authentication & AES-256-GCM encryption

### Architecture
```
Frontend (React + Vite)  ←→  Backend (Node.js/Express)  ←→  MongoDB
     :5173                          :5000                    :27017
```

---

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** v18 or higher
- ✅ **MongoDB** (local or cloud)
- ✅ **npm** or **yarn**
- ✅ **Git** (optional)

### Verify Installation

```powershell
node --version      # Should show v18+
npm --version
mongosh --version
```

---

## 🚀 Installation Steps

### Step 1: Clone/Navigate to Project

```powershell
cd face-recognition
# or
git clone https://github.com/prasadpolipalli/Final-Project.git
cd Final-Project
```

---

### Step 2: Backend Setup

```powershell
cd server

# Install dependencies
npm install

# Create environment file
copy .env.example .env
# or on Linux/Mac: cp .env.example .env
```

**Edit `.env` file with your configuration:**

```env
# Database
MONGO_URI=mongodb://localhost:27017/verifai

# Security Keys (Generate below)
JWT_SECRET=your-super-secret-jwt-key-here
EMBEDDING_AES_KEY=your-256-bit-base64-key-here

# Server Settings
PORT=5000
NODE_ENV=development
FACE_RECOGNITION_THRESHOLD=0.6
```

**Generate Encryption Keys:**

```powershell
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Generate AES Key
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the outputs and paste them in `.env` file.

---

### Step 3: Create Admin User

Create file: `server/scripts/createAdmin.js`

```javascript
import mongoose from 'mongoose';
import User from '../src/models/User.model.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    const admin = new User({
      name: 'Admin User',
      email: 'admin@verifai.com',
      passwordHash: 'admin123',
      role: 'ADMIN'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@verifai.com');
    console.log('🔑 Password: admin123');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
```

Run it:
```powershell
node scripts/createAdmin.js
```

---

### Step 4: Frontend Setup

```powershell
cd client

# Install dependencies
npm install

# Create models directory
mkdir -p public/models

# Download face-api.js models
cd public/models

# Using jsDelivr CDN (Recommended)
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/tiny_face_detector_model-weights_manifest.json" -OutFile "tiny_face_detector_model-weights_manifest.json"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/tiny_face_detector_model-shard1" -OutFile "tiny_face_detector_model-shard1"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/face_landmark_68_model-weights_manifest.json" -OutFile "face_landmark_68_model-weights_manifest.json"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/face_landmark_68_model-shard1" -OutFile "face_landmark_68_model-shard1"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/face_recognition_model-weights_manifest.json" -OutFile "face_recognition_model-weights_manifest.json"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/face_recognition_model-shard1" -OutFile "face_recognition_model-shard1"

Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights/face_recognition_model-shard2" -OutFile "face_recognition_model-shard2"

cd ..
```

**Create `.env` in client directory:**

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

### Step 5: Start MongoDB

```powershell
# Check if running
Get-Service MongoDB | Select-Object Status

# Start if not running
Start-Service MongoDB
```

---

## ▶️ Running the Application

### Terminal 1 - Start Backend

```powershell
cd server
npm run dev
```

Expected output:
```
✅ Server running on http://localhost:5000
✅ MongoDB connected
```

### Terminal 2 - Start Frontend

```powershell
cd client
npm run dev
```

Expected output:
```
  VITE v5.x.x  build 0.00s
  ➜  Local:   http://localhost:5173
```

### Terminal 3 - Open in Browser

Navigate to:
```
http://localhost:5173
```

---

## 🔐 Login Credentials

Default admin account:
- **Email:** admin@visiomark.in
- **Password:** admin123

---

## 📊 Admin Dashboard Features

Once logged in, you can:

### 1. Create Courses
- Go to **Courses**
- Add course details
- Set capacity and enrollment

### 2. Manage Users
- Create Teachers
- Create Students
- Assign roles

### 3. Manage Enrollments
- Assign students to courses
- Track enrollment status

### 4. Monitor Attendance
- View live attendance
- Check student records
- Generate reports

### 5. Export Data
- Download attendance as CSV
- Generate analytics reports

---

## 🎯 User Workflows

### Student Workflow
1. Login with credentials
2. Navigate to "Register Face"
3. Allow camera access
4. Capture facial embedding (encrypted)
5. ✅ Face registered successfully

### Teacher Workflow
1. Login with credentials
2. Go to "Attendance"
3. Create attendance session
4. Start camera
5. Students stand in front of camera
6. Click "Mark Attendance"
7. System recognizes and marks attendance

### Admin Workflow
1. Login with admin credentials
2. Create courses and enrollments
3. Create user accounts
4. Monitor system
5. Generate reports
6. Export data

---

## 🔐 Security Features

✅ **AES-256-GCM Encryption** - Face embeddings encrypted before storage
✅ **JWT Authentication** - Secure token-based authentication
✅ **bcrypt Password Hashing** - Passwords hashed with 10 salt rounds
✅ **Role-Based Access Control** - Admin, Teacher, Student roles
✅ **No Raw Face Images** - Only encrypted embeddings stored
✅ **HTTPS Ready** - Production-ready security

---

## 📁 Project Structure

```
Final-Project/
├── server/                          # Backend (Node.js/Express)
│   ├── src/
│   │   ├── config/                 # Database config
│   │   ├── controllers/            # Route handlers
│   │   ├── middleware/             # Auth, error handling
│   │   ├── models/                 # MongoDB schemas
│   │   ├── routes/                 # API endpoints
│   │   ├── utils/                  # Crypto, JWT utilities
│   │   └── index.js               # Entry point
│   ├── scripts/
│   │   └── createAdmin.js
│   ├── .env.example
│   └── package.json
│
├── client/                          # Frontend (React + Vite)
│   ├── public/
│   │   └── models/                 # face-api.js models
│   ├── src/
│   │   ├── components/             # React components
│   │   ├── context/                # Auth context
│   │   ├── pages/                  # Page components
│   │   ├── services/               # API client
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── README.md                        # Main documentation
└── QUICK_START.md
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user (Admin only)
- `POST /api/v1/auth/login` - Login

### Face Registration
- `POST /api/v1/face/register` - Register face (Student)

### Attendance
- `POST /api/v1/attendance/session` - Create session (Teacher)
- `PATCH /api/v1/attendance/session/:id/close` - Close session
- `POST /api/v1/attendance/recognize` - Mark attendance
- `GET /api/v1/attendance/student/:studentId` - Student records
- `GET /api/v1/attendance/export` - Export CSV

### Admin
- `POST /api/v1/admin/users` - Create user
- `GET /api/v1/admin/users` - List users
- `POST /api/v1/admin/courses` - Create course
- `POST /api/v1/admin/enrollments` - Create enrollment

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection fails | Check MONGO_URI in .env, ensure MongoDB is running |
| Port already in use | Change PORT in .env or close conflicting app |
| Models not loading | Verify 7 model files in `client/public/models/` |
| Camera not working | Check browser permissions, use HTTPS in production |
| JWT errors | Ensure JWT_SECRET is set in .env |
| Node modules error | Delete `node_modules`, run `npm install` again |

---

## 🔧 Development Commands

```bash
# Backend
cd server
npm run dev          # Start dev server

# Frontend
cd client
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📊 System Status Checklist

- ✅ Frontend running on http://localhost:5173
- ✅ Backend running on http://localhost:5000
- ✅ MongoDB connected on localhost:27017
- ✅ Face recognition models loaded
- ✅ Admin user created
- ✅ User authentication working
- ✅ Face registration working
- ✅ Attendance tracking working
- ✅ Reports and export working
- ✅ Encryption enabled

---

## 🌐 Deployment

For production deployment:

1. **Build Frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Set Production Environment Variables**
3. **Use MongoDB Atlas** for cloud database
4. **Deploy to:** AWS, Heroku, DigitalOcean, or Vercel

---

## 📞 Support

For issues or questions:
- Check the README.md file
- Review the troubleshooting section
- Check backend console logs
- Check browser DevTools (F12)

---

## 📄 License

ISC

---

## ✅ Verified Working Features

- ✅ User registration and authentication
- ✅ Role-based access control
- ✅ Face registration with encryption
- ✅ Live attendance sessions
- ✅ Face recognition and marking
- ✅ Attendance reports
- ✅ CSV export
- ✅ User management
- ✅ Course management
- ✅ Enrollment management

---

**Last Updated:** February 27, 2026

**Status:** Production Ready ✅
