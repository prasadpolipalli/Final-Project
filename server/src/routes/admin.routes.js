import express from 'express';
import {
  createUser,
  getUsers,
  deleteUser,
  updateUser,        // ✅ ADD THIS
  createStudent,
  getStudents,
  deleteStudent,
  updateStudent,     // ✅ ADD THIS
  createCourse,
  getCourses,
  deleteCourse,
  updateCourse,      // ✅ ADD THIS
  createEnrollment,
  getEnrollments,
  deleteEnrollment,
  registerStudentFace,
} from '../controllers/admin.controller.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.middleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

// User routes
router.post('/users', authMiddleware, roleMiddleware(ROLES.ADMIN), createUser);
router.get('/users', authMiddleware, roleMiddleware(ROLES.ADMIN), getUsers);
router.put('/users/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), updateUser); // ✅ NEW
router.delete('/users/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), deleteUser);

// Student routes
router.post('/students', authMiddleware, roleMiddleware(ROLES.ADMIN), createStudent);
router.get('/students', authMiddleware, roleMiddleware(ROLES.ADMIN), getStudents);
router.put('/students/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), updateStudent); // ✅ NEW
router.delete('/students/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), deleteStudent);

// Course routes
router.post('/courses', authMiddleware, roleMiddleware(ROLES.ADMIN), createCourse);
router.get('/courses', authMiddleware, roleMiddleware(ROLES.ADMIN), getCourses);
router.put('/courses/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), updateCourse); // ✅ NEW
router.delete('/courses/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), deleteCourse);

// Enrollment routes
router.post('/enrollments', authMiddleware, roleMiddleware(ROLES.ADMIN), createEnrollment);
router.get('/enrollments', authMiddleware, roleMiddleware(ROLES.ADMIN), getEnrollments);
router.delete('/enrollments/:id', authMiddleware, roleMiddleware(ROLES.ADMIN), deleteEnrollment);

// Face registration
router.post('/face/register', authMiddleware, registerStudentFace);

export default router;