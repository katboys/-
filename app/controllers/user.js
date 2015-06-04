var userModel = require('../models/user');
var blog = require('./common');
module.exports = {
   
    registerSave: function *(user){
    
        var data = this.request.body;
        
         if(data.account =='') {
            this.throw(415,'用户名不能为空');
        }else if(data.password ==''){
            this.throw(415,'用户密码不能为空');
        }else if(data.checkpassword ==''){
            this.throw(415,'用户密码确认不能为空');
        }else if(data.password != data.checkpassword){
            this.throw(415,'两次密码不一致');
        }else {
            

            var user = yield userModel.saveUser(data);
             this.redirect('/login');}


         },

        

        
  
  
     
    register: function *(){
         this.body = yield render('注册');
         
    },

    signin: function *(){
         this.body = yield render('登录');
    },


    render: function * () {

        var codeMap = {
            "1":"密码错误"
        };
        
        var code = this.query['c'];

        this.body = yield render('登录',{
            msg: code && codeMap[code]

        });
    },
   //注册模块
    login: function *(){
        var data = this.request.body;

        var user = yield userModel.getUser(data.account);

        if (user && user.password  !== data.password ) {
           this.throw(415,'账号或者密码错误，请重试');
            this.redirect('/login?c=1');
        } else if (data.password == '' ) {
              this.throw(415,'账号不能为空，请重试');
            this.redirect('/login?c=1');
        }else if (data.password == '' ) {
              this.throw(415,'密码不能为空，请重试');
            this.redirect('/login?c=1');
        }else if (!user) {
              this.throw(415,'账号未注册，请重试');
            this.redirect('/login?c=1');
        }
        else{
           this.session.user = user.account;
            this.redirect('/home');
        }
    },
    //退出登录

    logout:function *(){
            this.cookies.set('member', '');
            G.user={};
            this.redirect('/');
        }




};