const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Users', CompanySchema);