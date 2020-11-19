const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    
    name: {
        type: String
    },

    description: {
        type: String
    },
    
    length: {
        type: Number
    },
    
    inversions: {
        type: Number
    },
    
    active: {
        type: Boolean
    },

    park: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Coaster', coasterSchema)