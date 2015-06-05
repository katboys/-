var DisplayController = require('../app/controllers/display');
var UserController = require('../app/controllers/user');
var PageController = require('../app/controllers/page');
var GoodsController = require('../app/controllers/goods');
var ImageController = require('../app/controllers/image');

module.exports.init = function(app,route){
   
    //展示页面
    app.use(route.get('/', DisplayController.display));
    //首页
    app.use(route.get('/home', DisplayController.pagehome));
    //注册页面
    app.use(route.get('/register', UserController.register));
    // 校园活动
    app.use(route.get('/home/action', DisplayController.schoolAction));

    //帮助
    app.use(route.get('/home/help', DisplayController.help));
    //校园易物
    app.use(route.get('/home/swrap', DisplayController.swrap));
   

    //关于我们
    app.use(route.get('/about', DisplayController.about));
   
    app.use(route.get('/signin', UserController.signin));
    //登录页
    app.use(route.get('/login', UserController.render));

    //登录
    app.use(route.post('/user/login', UserController.login));
    //注册
    app.use(route.post('/user/register', UserController.registerSave));
    //活动
    app.use(route.post('/post', PageController.create));
    //活动分页
    app.use(route.get('/post/:id', PageController.show));


    app.use(route.get('/need/goods', GoodsController.show));
    //上传图片
  app.use(route.post('/images/post', ImageController.post));
    //上传图片
  app.use(route.post('/uploadImg', ImageController.postImg));


 
 /*个人中心板块*/
  //个人中心
   app.use(route.get('/home/user', DisplayController.user));

  //word上传页面
   app.use(route.get('/home/user/word', DisplayController.word));

  //img上传页面
   app.use(route.get('/home/user/img', DisplayController.img));
   //inf上传页面
   app.use(route.get('/home/user/inf', DisplayController.inf));



}


