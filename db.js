var mongoose = require("mongoose");
var config = require("./config/config");
mongoose.Promise = global.Promise;
mongoose
.connect(config.MONGODB_URI, {
useNewUrlParser: true,
useCreateIndex: true,
useUnifiedTopology: true,
useFindAndModify: false,
})
.then(() => { console.log("DB connection successful...");

})
.catch((err) => console.error(err));
 module.export  = mongoose;