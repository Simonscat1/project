const Schemas = require('../models/UserSchema.js')

module.exports = function(io){
     let onlineUsers = []
     const addNewUser = async (userID, socketID) =>{
          if(userID != null){
               !onlineUsers.some((user) => user.userID === userID) &&
               onlineUsers.push({ userID, socketID })
          }
     }
     const removeUser = (socketID) => {
          onlineUsers = onlineUsers.filter((user) => user.socketID !== socketID)
     };
        
     const getUser = (userID) => {
          if(userID != null){
               return onlineUsers.find((user) => user.userID === userID);
          }
     };

     io.on('connection', (socket) => {
          socket.on("newUser", async (userID, socketID) => {
               addNewUser(userID, socket.id)
          })
          socket.on('edit_profile', (data, callback)=> {
               console.log(data, "edit_profile")
          })
          socket.on('post_nothings', async (data) => {
               const receiver = getUser(data);
               console.log(receiver)
               if(receiver != undefined){
                    const user = await Schemas.site.findOne({ ID: receiver.userID })
                    io.to(receiver.socketID).emit("getNothings", user.request)
               }
          })
          socket.on("reqAddFriend", async (data) => {
               const user = await Schemas.site.findOne({ discord: data.id })
               const userDiscord = await Schemas.user_auth.findById(data.id)
               const ontherUser = await Schemas.site.findById(data.idAddUser)
               const ontherUserDiscord = await Schemas.user_auth.findById(ontherUser.discord)
               await user.updateOne({
                    $push:{
                         friends:{
                              id: ontherUser._id, 
                              userID: ontherUserDiscord.userID,
                              userNames: ontherUserDiscord.userName,
                              avatars: ontherUserDiscord.avatar
                         }
                    }
               })
               await user.updateOne({ 
                    $pull: { 
                         request: { 
                         } 
                    }
               });
               await ontherUser.updateOne({
                    $push:{
                         friends:{
                              id: user._id,
                              userID: user.ID,
                              userNames: userDiscord.userName,
                              avatars: userDiscord.avatar
                         }
                    }
               })
          })
          socket.on("removeAddUser", async (data) => {
               const user = await Schemas.site.findOne({ discord: data.id })
               await user.updateOne({ 
                    $pull: { 
                         request: { 
                         } 
                    }
               });
          })
          socket.on('add_friend', async (friendID, callback)=> {
               const frindUserId = await Schemas.site.findOne({ID: friendID.id});
               const userAdd = await Schemas.site.findOne({ discord: friendID.userAddidDb })
               const userAddDiscrd = await Schemas.user_auth.findById(userAdd.discord)
               if((frindUserId.request.userID != userAdd.ID) || (frindUserId.request == null)){
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
               }
          })
          socket.on('disconnect', () => {
               removeUser(socket.id)
          })
     })
}