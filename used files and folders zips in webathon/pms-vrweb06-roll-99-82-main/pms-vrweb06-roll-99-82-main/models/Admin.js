import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const adminSchema = new Schema({
    adminId: {
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
    college: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});


export default mongoose.models.Admin || model('Admin', adminSchema);


