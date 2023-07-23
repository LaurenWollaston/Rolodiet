const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mbhimjeea:4PAMEfMfgmrIBUgD@recipe-search.gkpzti5.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


module.exports = mongoose.connection;
