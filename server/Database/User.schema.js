import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    weightEntries: [{date: Date, weight: Number}],
    nutritionEntries: [{date: Date, calories: Number, carbohydrate: Number, fat: Number, protein: Number}],
    period: [{start: Date, end: Date}]
});


module.exports = mongoose.model('User', UserSchema);