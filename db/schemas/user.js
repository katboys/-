var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    account:String,
    password:String,
    resume:
    {
        
        nickname:String,
        email:String,
        school:String,
        grade:Number,
        gender:String
       
       
    },
    
 
});

UserSchema.statics = {

	findByName: function(name, cb) {
		return this.findOne({ account: name }, cb);
	},

   


};

module.exports = UserSchema;
