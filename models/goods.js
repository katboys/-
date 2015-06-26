//物品的数据库信息
var mongodb = require('./db');

function Goods(whos,whosName,name,img_url,price,description,flag){
	this.whos = whos;
	this.whosName = whosName;
	this.name = name;
	this.price = price;
	this.url = img_url;
	this.description = description;
	this.flag = flag; //是否下架
}

module.exports = Goods;

Goods.prototype.save = function (callback) {
	var date = new Date();
	var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
 	}
 	var goods = {
 		whos:this.whos,
 		whosName:this.whosName,
 		name:this.name,
 		time:time,
 		price:this.price,
 		url:this.url,
 		description:this.description,
 		flag:this.flag
 	}

 	mongodb.open(function(err,db){
 		if(err){
 			return callback(err);
 		}
 		db.collection('goods',function(err,collection){
 			if(err){
 				mongodb.close();
 				return callback(err);
 			}
 			collection.insert(goods,{
 				safe:true
 			},function(err){
 				mongodb.close();
 				if(err){
 					return callback(err);
 				}
 				callback(null);
 			});
 		});
 	});
};

Goods.get = function (keyset,callback) {
	var type=keyset.type,key=keyset.key;
	mongodb.open(function(err,db){
		if(err)return callback(err);
		db.collection('goods',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var query={};
			if(type==0){   //search all
				query={};
			}
			else if(type==1){//search whos
				query.whosName=key;
			}
			else if(type==2){ //search name with regexp
				query.name=new RegExp(key);
			}
			collection.find(query).sort({
				time:-1
			}).toArray(function(err,docs){
				mongodb.close();
				if(err)return callback(err);
				callback(null,docs);
			});
		});
	});
};

Goods.update = function	(keyset,callback) {
	var type=keyset.type,key=keyset.key;
	mongodb.open(function(err,db) {
		if(err)return callback(err);
		db.collection('goods',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			var val;
			if(type==0) {// 下架
				val=1;
			}else {
				val=0;
			}
			collection.update({
				"url":key
			},{$set:{"flag":val}},function(err){
				mongodb.close();
				if(err)callback(err);
				callback(null);
			});
		});
	});
};

Goods.remove=function(url,callback){
	mongodb.open(function(err,db){
		if(err)return callback(err);
		db.collection('goods',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.remove({
				"url":url
			},function(err){
				if(err)return callback(err);
				return callback(null);
			});
		});
	});
};

Goods.edit=function(url,name,price,desc,callback){
	mongodb.open(function(err,db){
		if(err)return callback(err);
		db.collection('goods',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update({
				"url":url
			},{$set:{
				"name":name,
				"price":price,
				"description":desc
			}},function(err){
				if(err)return callback(err);
				return callback(null);
			});
		});
	});
};

Goods.updateUser=function(name,user,callback){
	mongodb.open(function(err,db){
		if(err)return callback(err);
		db.collection('goods',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.update({
				"whosName":name
			},{$set:{
				"whos":user
			}},function(err){
				if(err)return callback(err);
				return callback(null);
			});
		});
	});
};

