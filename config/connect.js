import mongoose from 'mongoose';

// Connect to MongoDB
/// strictquery is set to false for mongoose 7
const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: true, ssl: true });
        console.log(`MongoDB Connected Successfully with : "${conn.connection.host}" host`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectMongoDB;