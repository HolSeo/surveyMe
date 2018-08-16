const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipients')

const surveySchema = new Schema({
    title: String,
    subject: String,
    body: String,
    recipients: [RecipientSchema],
    fiveStar: { type: Number, default: 0 },
    fourStar: { type: Number, default: 0 },
    threeStar: { type: Number, default: 0 },
    twoStar: { type: Number, default: 0 },
    oneStar: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectsId, ref: 'User' }, // relationship with User model.
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('surveys', surveySchema)