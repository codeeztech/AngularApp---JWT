const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const flightSchema = new Schema({
    id: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    from:{type: String},
    to:{type: String},
    flight_type:{type: String},
    emailId: {type: String},
    mobile:{type: String},
    active: {type: Boolean},
}, {
  timestamps: true
}
);

const FlightsSchema = mongoose.model('Flight', flightSchema);

module.exports = FlightsSchema;