module.exports = {
	display: function *() {
  this.body = yield render('展示页',{
 session:this.session

  });
},

     pagehome: function *() {
  this.body = yield render('主页面',{
   session:this.session});
},
     schoolAction: function *() {
  this.body = yield render('校园活动');
},
     help: function *() {
  this.body = yield render('帮助');
},
     swrap: function *() {
  this.body = yield render('校园易物');
},
user: function *() {
  this.body = yield render('个人中心',{
      
  });
},
about: function *() {
  this.body = yield render('关于我们');
},
word: function *() {
  this.body = yield render('上传word');
},
img: function *() {
  this.body = yield render('上传图片');
},




}
