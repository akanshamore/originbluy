const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {

        // const uri =
        //     "mongodb+srv://sidgore:ram123@cluster0.pmzjheb.mongodb.net/mumblesDB?retryWrites=true&w=majority";
        // mongoose.connect(uri);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
