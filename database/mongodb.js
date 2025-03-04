import mongoose from 'mongoose';
import {DB_URI, NODE_ENV, PORT} from '../config/env.js';

if(!DB_URI) {
    throw new Error('MongoDB URI requires MongoDB URI');
}

const connectDataBase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
    } catch (error){
        console.error('MongoDB URI requires MongoDB URI',error);

        process.exit(1);
    }
}

export default connectDataBase;