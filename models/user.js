var mongodb = require('./db');

function User(user) {
  this.avatar = user.avatar;
  this.name = user.name;
  this.nickname = user.nickname;
  this.password = user.password;
  this.mygoods = user.mygoods;
  this.wechat = user.wechat;
  this.sex = user.sex;
  this.auth = user.auth;
 // this.email = user.email;
};

module.exports = User;

//存储用户信息
User.prototype.save = function(callback) {
  //要存入数据库的用户文档
  var user = {
      avatar: this.avatar,
      name: this.name,
      nickname: this.nickname,
      password: this.password,
      mygoods: this.mygoods,
      wechat: this.wechat,
      sex: this.sex,
      auth:this.auth
   //   email: this.email
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //将用户数据插入 users 集合
      collection.insert(user, {
        safe: true
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//错误，返回 err 信息
        }
        callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
      });
    });
  });
};

//读取用户信息
User.get = function(name, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);//错误，返回 err 信息
    }
    //读取 users 集合
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);//错误，返回 err 信息
      }
      //查找用户名（name键）值为 name 一个文档
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err 信息
        }
        callback(null, user);//成功！返回查询的用户信息
      });
    });
  });
};

User.updateGoods = function(name,goods,callback) {
  mongodb.open(function(err,db) {
    if(err){
      return callback(err);
    }
    db.collection('users',function(err,collection) {
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.update({
        "name":name
      },{$addToSet:{
        mygoods:goods
      }},function(err){
        mongodb.close();
        if(err)return callback(err);
        callback(null);
      });
    });
  });
};


User.update = function(name,nickname,wechat,callback) {
  mongodb.open(function(err,db){
    if(err)return callback(err);
    db.collection('users',function(err,collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.update({
        "name":name
      },{$set:{
        "nickname":nickname,
        "wechat":wechat
      }},function(err){
        mongodb.close();
        if(err)return callback(err);
        callback(null);
      });
    });
  });
};

User.updateAvatar=function(name,avatar,callback) {
  mongodb.open(function(err,db){
    if(err)return callback(err);
    db.collection('users',function(err,collection){
      if(err){
        mongodb.close();
        return callback(err);
      }
      collection.update({
        "name":name
      },{$set:{
        "avatar":avatar
      }},function(err){
        mongodb.close();
        if(err)return callback(err);
        callback(null);
      });
    });
  });
};
