const Schemas = require('../models/UserSchema.js')

module.exports = function(io){
     io.on('connection', (socket) => {
          socket.on('edit_profile', (data, callback)=> {
               console.log(data, "edit_profile")
          })
          socket.on('nothings', (data) => {
               //сделать получение requst
          })
          socket.on('add_friend', async (friendID, callback)=> {
               const frindUserId = await Schemas.site.findOne({ID: friendID.id});
               const userAdd = await Schemas.site.findOne({ discord: friendID.userAddidDb })
               const userAddDiscrd = await Schemas.user_auth.findById(userAdd.discord)
               console.log(userAddDiscrd)

               await frindUserId.updateOne({
                    $push:{
                         request: {
                              id: userAdd._id,
                              userID: userAdd.ID,
                              userNames: userAddDiscrd.userName,
                              avatars: userAddDiscrd.avatar
                         }
                    }
               })
          })
     })
}