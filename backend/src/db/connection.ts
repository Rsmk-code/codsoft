import { config } from '../config/config';
import mongoose, { ConnectOptions } from 'mongoose'


const connectToDatabase = async () => {
    let mongoURI = config.mongo.url;
    
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log('Connected to MongoDB');
    }catch(error){
        console.log(error)
    }
}

export default connectToDatabase;