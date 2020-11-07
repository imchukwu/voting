const mongoose = require('mongoose');

//Map Global Promises
mongoose.Promise = global.Promise;

//Mongoose Connect
mongoose
.connect('mongodb+srv://imchukwu:comp6252@clusterx.hmgls.mongodb.net/cdssvote?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));
