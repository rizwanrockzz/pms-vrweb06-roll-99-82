import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const studentSchema = new Schema({
    studentid: {
        type: String,
        default: ""
    },
    rollno: {
        type: String,
        default: ""
    },
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: ""
    },
    phno: {
        type: String,
        default: ""
    },
    college: {
        type: String,
        default: ""
    },
    department: {
        type: String,
        default: ""
    },
    departmentid: {
        type: String,
        default: ""
    },
    placed: {
        type: Boolean,
        default: false
    },
    profilepic: {
        type: String,
        default: ""
    },
    // offerletter ,cracked companies
}, {
    timestamps: true
});


export default mongoose.models.Student || model('Student', studentSchema);


