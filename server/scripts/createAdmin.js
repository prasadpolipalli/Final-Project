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
    console.log('📧 Email: admin@visiomark.com');
    console.log('🔑 Password: admin123');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();