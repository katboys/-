

    path = require('path');//path 路径
var koa = require('koa');
    app = koa();
    render = require('./lib/render');
    logger = require('koa-logger');
    route = require('koa-route');//http 路由
    bodyParser = require('koa-bodyparser'),//
    
    serve = require('koa-static');
    staticCache = require('koa-static-cache'),
    fs = require('fs'),
    formidable = require('formidable');
    
    co = require('co'),
    

    global._ = require('lodash');


    mongoose = require('mongoose');
    session = require('koa-session-store');//缓存存储
    mongooseStore = require('koa-session-mongoose');

var routes = require('./config/routes');


mongoose.connect('mongodb://127.0.0.1:27017/test',function(err,res){
        if(err){console.log('Connection Error: ' + error.message);
                return;
          }
          console.log('Connected to mongodb');

        });

 var db = mongoose.connect;
app.keys = ['koa','blog'];

app.use(session({
    store: mongooseStore.create(),
    collection: 'koaSessions',
    connection: db,
    expires: 30 * 60 * 1000,//到期时间30分钟60秒1000毫秒
    model: 'KoaSession'
}));
// middleware
app.use(bodyParser());

app.use(logger());

// route middleware
routes.init(app,route);


var static_root = path.join(__dirname, "/public");//静态文件
app.use(staticCache(static_root, {
       maxAge: 860000000,
       gzip:true
       }));
/**
 * Show creation form.
 */
app.use(serve(path.join(__dirname, "/public/")));

app.use(function * (next) {
        //非favicon 直接跳过
        if ('/favicon.ico' != this.path) return yield next;
        //头部定义防止 404
        if ('GET' !== this.method && 'HEAD' !== this.method) {
            this.status = 'OPTIONS' == this.method ? 200 : 405;
            this.set('Allow', 'GET, HEAD, OPTIONS');
            return;
        }
    });


 app.use(route.get('/404',function * pageNotFound(next) {
        this.body = yield this.render('404');
    }));


//监听3000端口
app.listen(3000);
console.log('listening on port 3000');

//错误处理route.get('/404',
app.on('error', function(err) {
        console.log('server error', err);
    });



