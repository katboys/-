var express = require('express');
var crypto = require('crypto'),
	User = require('../models/user.js'),
	Goods = require('../models/goods.js');
var router = express.Router();


function checkLogin(req,res,next){
	if(!req.session.user) {
		req.flash('error','未登录!');
		res.redirect('/signin');
	}
	next();
}

function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','已登陆!');
		res.redirect('back');
	}
	next();
}

/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.user)res.redirect('/home');
	res.render('index', {

	});
});

router.get('/home',function(req,res) {
	res.render('home', {
		title: '主页',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.get('/activity',function(req,res) {
	res.render('activity',{
		title: '校园活动',
		user: req.session.user
	});
});

router.get('/help',function(req,res) {
	res.render('help',{ });
});

router.get('/about',function(req,res) {
	res.render('about',{ });
});

router.get('/swap',function(req,res) {
	var keyset={
		key:null,
		type:0
	};
	Goods.get(keyset,function(err,goodsArray){
		if(err)goodsArray=[];
		res.render('swap',{
			title: '校园易物',
			user: req.session.user,
			goodsArray:goodsArray ,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

router.get('/user',checkLogin);
router.get('/user',function(req,res) {
	var keyset={
		key:req.session.user.name,
		type:1
	};
	Goods.get(keyset,function(err,goodsArray){
		if(err)goodsArray=[];
		res.render('user_center',{
			title: '用户中心',
			user: req.session.user,
			goodsArray:goodsArray ,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});

router.post('/user',checkLogin);
router.post('/user',function(req,res) {

});

router.get('/register',checkNotLogin);
router.get('/register',function(req,res) {
	res.render('register',{ 
		title: '注册',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/register',checkNotLogin);
/*
router.post('/register',function(req,res){
	console.log(req.body);
});
*/
router.post('/register',function(req,res) {
	var name = req.body.account,
		password = req.body.password,
		password_re = req.body.checkpassword,
		wechat = req.body.wechatip,
		sex = req.body.inlineRadioOptions,
		avatar;
	if(!name){
		req.flash('error','用户名不能为空！');
		return res.redirect('/register');
	}
	if(!password){
		req.flash('error','密码不能为空! ');
		return res.redirect('/register');
	}
	if(sex==='option1'){
		avatar = '排版 -.jpg';
	}else if(sex==='option2'){
		avatar = '排版.jpg';
	}else {
		req.flash('error','请选择性别！');
		return res.redirect('/register');
	}
	if(!wechat){
		req.flash('error','请填写微信！');
		return res.redirect('/register');
	}
	if(password!=password_re){
		req.flash('error','两次密码不一致！');
		return res.redirect('/register');
	}
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	var newUser = new User({
		name:name,
		nickname:'',
		wechat:wechat,
		sex:sex,
		avatar:avatar,
		password:password,
		mygoods:[] 
	});
	User.get(newUser.name,function(err,user){
		if(err){
			req.flash('error',err);
			return res.redirect('/register');
		}
		if(user){
			req.flash('error','用户名已存在!');
			return res.redirect('/register');
		}
		newUser.save(function(err,user){
			if(err){
				req.flash('error',err);
				return res.redirect('/register');
			}
			req.flash('success','注册成功');
			req.session.user = newUser;
			res.redirect('/home');
		});
	});
});

router.get('/signin', checkNotLogin);
router.get('/signin',function(req,res) {
	res.render('signin',{ 
		title: '登陆',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/signin', checkNotLogin);
router.post('/signin',function(req,res) {
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	User.get(req.body.account,function(err,user){
		if(!user){
			req.flash('error','用户名不存在!');
			return res.redirect('/signin');
		}
		if(user.password != password) {
			req.flash('error','密码错误!');
			return res.redirect('/signin');
		}

		req.session.user = user;
		req.flash('success','登陆成功!');
		res.redirect('/home');
	});
});

router.get('/signout', checkLogin);
router.get('/signout',function(req,res) {
	req.session.user = null;
	req.flash('success','登出成功!');
	res.redirect('/home');
});


router.post('/uploadimg',checkLogin);
router.post('/uploadimg',function(req,res) {
	var currentuser=req.session.user;

	var	goods=new Goods(currentuser,currentuser.name,req.body.title,req.files.file.name,req.body.price,req.body.desc,0);
	goods.save(function(err){
		if(err){
			req.flash('error',err);
			return res.redirect('/swap');
		}
		User.updateGoods(currentuser.name,goods,function(err){
			if(err){
				req.flash('error',err);
				res.redirect('/swap');
			}
			req.flash('success','发布成功！');
			res.redirect('/swap');
		});
	});
});

router.get('/upDown/:type/:which',function(req,res) {
	var keyset={
		type:req.params.type,
		key:req.params.which
	}
	Goods.update(keyset,function(err){
		if(err){
			req.flash('error',err);
			res.redirect('/user');
		}
		req.flash('success','下架成功!');
		res.redirect('/user');
	});
});

router.get('/deleteGoods/:which',function(req,res) {
	Goods.remove(req.params.which,function(err){
		if(err){
			req.flash('error',err);
			res.redirect('/user');
		}
		req.flash('success','删除物品成功!');
		res.redirect('/user');
	});
});
router.post('/editUser',checkLogin);
router.post('/editUser',function(req,res){
	var nickname=req.body.nickname,
		wechat=req.body.wechat,
		name=req.session.user.name;
	User.update(name,nickname,wechat,function(err){
		if(err){
			req.flash('error',err);
			res.redirect('/user');
		}
		req.session.user.nickname=nickname;
		req.session.user.wechat=wechat;
		Goods.updateUser(req.session.user.name,req.session.user,function(err){
			req.flash('success',"更改成功");
			res.redirect('/user');
		});
	});
});

router.post('/uploadAvatar',checkLogin);
router.post('/uploadAvatar',function(req,res){
	var avatar=req.files.file.name;
	User.updateAvatar(req.session.user.name,avatar,function(err){
		if(err){
			req.flash('error',err);
			res.redirect('/user');
		}
		
		req.session.user.avatar=avatar;
		Goods.updateUser(req.session.user.name,req.session.user,function(err){
			req.flash('success',"更新头像成功");
			res.redirect('/user');
		});
	});
	
});

router.post('/editGoods/:url',checkLogin);
router.post('/editGoods/:url',function(req,res){
	var name = req.body.title,
		price = req.body.price,
		desc = req.body.desc;
	Goods.edit(req.params.url,name,price,desc,function(err){
		if(err){
			req.flash('error',err);
			res.redirect('/user');
		}
		req.flash('success',"更新信息成功");
		res.redirect('/user');
	});
});

router.post('/dealSearch',function(req,res){
	var query=req.body.query;
	var keyset={
		key:query,
		type:2
	};
	Goods.get(keyset,function(err,goodsArray){
		if(err)goodsArray=[];
		res.render('swap',{
			title: '校园易物',
			user: req.session.user,
			goodsArray:goodsArray ,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});
});
module.exports = router;
