import mongoose from 'mongoose';

const connectDb  = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB successfully connected at : ${conn.connection.host}`);
    } catch (error) {
        console.log('MongoDB conncetion failed: ', error.message);
        process.exit(1);
    }
}

export default connectDb;