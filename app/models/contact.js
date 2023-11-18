import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Name Must Be Filled"],
        trim: true,
        minLenght: [2, "Name Must Be More Than 2 Characters"],
        maxLenght: [50, "Name Must Be Less Than 50 Characters"]
    },

    email: {
        type: String,
        required: [true, "Email Must Be Filled"],
        match: ["/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g", "Invalid Email Address"]
    },

    message: {
        type: String,
        required: [true, "Message Must Be Filled"]
    },

    date: {
        type: Date,
        default: Date.now,
    }
});

const Contact = mongoose.models.Contact || mongoose.model('contacts', contactSchema)
export default Contact;