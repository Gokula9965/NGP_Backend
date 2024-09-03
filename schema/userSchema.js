const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userDataSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    userId: {
        type: Number,
        unique: true
    }
});

userDataSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model("userData", userDataSchema);
