import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongo = async () => {
    const connection = await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to MongoDB');
    return connection;
};

export default connectMongo;