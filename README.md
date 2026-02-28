# 🎓 VisioMark - AI-Powered Attendance System

A modern web-based attendance system using **AI-powered face recognition** with encrypted face embeddings for biometric privacy and security.

![Status](https://img.shields.io/badge/Status-Production%20Ready-green)
![License](https://img.shields.io/badge/License-ISC-blue)
![Node Version](https://img.shields.io/badge/Node-v18%2B-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Deployment](#deployment)

---

## 🎯 Overview

**VisioMark** is a complete attendance management system that uses:

- 🔐 **AI Face Recognition** - Powered by face-api.js with ML models
- 🛡️ **Military-grade Encryption** - AES-256-GCM for face embeddings
- 👥 **Role-Based Access Control** - Admin, Teacher, Student roles
- 📊 **Real-time Analytics** - Attendance tracking and reporting
- 🌐 **RESTful API** - Complete backend API documentation
- 🎨 **Modern UI** - React + Vite + TailwindCSS frontend

### Technology Stack

**Frontend:**
- React 18 + Vite
- TailwindCSS for styling
- face-api.js for face recognition
- Axios for API calls
- React Router for navigation

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- crypto for AES-256-GCM encryption

---

## ✨ Features

### 👤 User Management
- ✅ Role-based user creation (Admin, Teacher, Student)
- ✅ Secure password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ User profile management
- ✅ Account status tracking

### 🔐 Face Registration
- ✅ Live face capture via webcam
- ✅ ML-based face detection
- ✅ Encrypted embedding storage
- ✅ Face data validation
- ✅ Re-registration support

### 📍 Attendance Tracking
- ✅ Real-time attendance marking
- ✅ Session-based attendance
- ✅ Student presence detection
- ✅ Attendance history
- ✅ Late/absent tracking

### 📊 Reports & Analytics
- ✅ Attendance reports by student
- ✅ Course-wise attendance statistics
- ✅ Monthly/Weekly reports
- ✅ CSV/Excel export
- ✅ PDF report generation

### 🎓 Course Management
- ✅ Create and manage courses
- ✅ Assign teachers to courses
- ✅ Student enrollment
- ✅ Capacity management
- ✅ Course scheduling

### 📱 Admin Dashboard
- ✅ System overview and statistics
- ✅ User management interface
- ✅ Course management
- ✅ Export data as PDF/Excel
- ✅ Real-time monitoring

---

## 🏗️ System Architecture
