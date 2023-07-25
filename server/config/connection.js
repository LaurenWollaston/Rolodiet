const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://laurenwollaston:Wd,4J%,8,>yYkZB@cluster0.bby5jkg.mongodb.net/?retryWrites=true&w=majority'|| 'mongodb://127.0.0.1:27017/good-eats');

module.exports = mongoose.connection;
