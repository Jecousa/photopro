const mongoose = require('mongoose');

const albumSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    phone: { type: Number, required: true },
    albumImage: { type: String, required: true }
});

module.exports = mongoose.model('Album', albumSchema);