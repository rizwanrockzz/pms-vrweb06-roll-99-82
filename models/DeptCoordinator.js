import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const deptCoordinatorSchema = new Schema({
    firstname: {
        type: String,
        default: ""
    },
    lastname: {
        type: String,
        default: ""
    },
    coordinatorid: {
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
    },
    department: {
        type: String,
        default: ""
    },
    departmentid: {
        type: String,
        default: ""
    },
}, {
    timestamps: true
});


export default mongoose.models.DeptCoordinator || model('DeptCoordinator', deptCoordinatorSchema);


