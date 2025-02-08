const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Media', mediaSchema);
