/**
 * Author: ken.xu
 * Date: 14-6-4 上午11:52
 */


/**
 *
 * @param _CS 全局 this
 * @param this.render 模版渲染函数
 * @param parse POST全局函数
 * @returns {*}
 */
module.exports = function() {

    //var ref = self.query.ref = self.request.header.referer || '/';

    return {
     /*   init: function * () {
            //:TODO 全局用户在线列表
            //if(!G.user){//当一个用户时 可以跨浏览器调用
            var user = self.cookies.get('member');
            G.user = user && JSON.parse(user) || {};
            //}
            //全局标签 包括导航栏
            if (!G.tag) G.tag = yield D('tag').find().exec();
            //权限认证
            this.auth();
        },*/




        msg:function (msg,url,title,second){
            msg = msg||'';
            url= url||'/';
            title=title||msg;
            second=second||2;
            return self.render('msg',{msg:msg,second:second,url:url,title:title});
        }


    }


}