var parse = require('co-busboy');

var os = require('os');

var fs = require('fs');
module.exports = {
 


  postImg: function *(){
        if ('POST' != this.method) return yield next;
switch (this.accepts('png', 'jpg','gif')) {
  case 'png': break;
  case 'jpg': break;
  case 'gif': break;
 
  default: this.throw(406, 'png, jpg, or gif only');
}
  // multipart upload
  var parts = parse(this);
  var part;

  while (part = yield parts) {
    var stream = fs.createWriteStream((__dirname + '/tmt/') + Math.random()+'.jpg' );
    part.pipe(stream);
    console.log('uploading %s -> %s', part.filename, stream.path);
  }

  this.redirect('/home/user/img');
  
    }
    


      };
