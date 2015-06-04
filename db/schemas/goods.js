var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GoodsSchema = new Schema({
	   

    posts: [{
        post:String,
        title:String,
        user: String,
	    name: String,
	    address: String,
	    price: String,
	    tags: String,
    }],
    
	meta: {
		createAt: {
			type: Date,
            default: Date.now()
		},
		updateAt: {
			type: Date,
            default: Date.now()
		}
	}
});

GoodsSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next && next();
});
//function(name,callback)
GoodsSchema.statics = {

	fetch: function(cb) {
		return this.find({}, cb);
	},

	findByName: function(name, cb) {
		return this.findOne({ name: name }, cb);
	},

	findById: function(id, cb) {
		return this.findOne({ _id: id }, cb);
	}
};

module.exports = GoodsSchema;
