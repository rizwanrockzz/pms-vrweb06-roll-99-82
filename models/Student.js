import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const crackedCompaniesDetailsSchema = new Schema({
    companyname: {
        type: String,
        default: ""
    },
    roleOffered: {
        type: String,
        default: ""
    },
    offerLetter: {
        type: String,
        default: ""
    },
    packageValue: {
        type: Number,
        default: 0
    },
    offerAccepted: {
        type: Boolean,
        default: false
    },
    notifications: {
        type: [String],
        default: []
    }
    // offerRecievedDate: {
    //     type: String,
    //     default: ""
    // }
})

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
    newlogin: {
        type: Boolean,
        default: true
    },
    passedOutYear: {
        type: String,
        default: ""
    },
    crackedCompanies: [crackedCompaniesDetailsSchema]
}, {
    timestamps: true
});


export default mongoose.models.Student || model('Student', studentSchema);

export const CrackedCompaniesDetails = mongoose.models.crackedCompaniesDetails || model('crackedCompaniesDetails', crackedCompaniesDetailsSchema);


