const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/social-media`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = connectDB