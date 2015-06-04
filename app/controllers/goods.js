module.exports = {
  show: function *(){
         this.body = yield render('物品页');
         
    },
};