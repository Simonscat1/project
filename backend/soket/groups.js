const Schema = require('../models/UserSchema.js');
const Groups = require('../models/Groups.js');
const Reg_teams = require('../models/Registered.js')

module.exports = function(io){
    io.on('connection', (socket) => {
        socket.on("grope_create", async ({ data }) => {
            if(data != ''){
                const create_grope = new Groups({
                    title: data.title,
                    content: data.context,
                    image: '',
                    elo:'0',
                    owner: data.owner,
                    players: {
                        id: data.owner,
                        userName: data.userName
                    },
                })
                await create_grope.save()
            }
        })
        socket.on("add_to_groupes", async ({id, userName, groupID, socketID}) => {
            const groups = await Groups.findById(groupID)
            const user = await Schema.site.findOne({ ID: id })
            await user.updateOne({
                $push:{
                    request_groupe:{
                        id: groups._id,
                        userNames: groups.title,
                        avatars: groups.image
                    }
                }
            })
        })
        socket.on("req_add_groupe", async (data) => {
            const user = await Schema.site.findOne({ discord: data.id })
            const user_discord = await Schema.user_auth.findById(data.id)
            const groups = await Groups.findById(data.group_add)
            await user.updateOne({
                $pull:{
                    request_groupe:{

                    }
                }
            })
            await groups.updateOne({
                $push:{
                    players:{
                        id:user.ID,
                        userName: user_discord.userName
                    }
                }
            })

        })
        socket.on("req_remove_groupe", async (data) => {
            const user = await Schema.site.findOne({ discord: data.id })
            await user.updateOne({
                $pull:{
                    request_groupe:{

                    }
                }
            })
        })
        socket.on("remove_groupe_user", async ({ idGroup, user }) => {
            const gropes = await Groups.findById(idGroup);
            if(gropes.owner == user.userID){
                await Groups.findByIdAndDelete(idGroup)
            }else{
                await gropes.updateOne({
                    $pull:{
                        players:{
                            id:user.userID,
                            userName: user.userName
                        }
                    }
                })
            }
        })
        socket.on("search_group", async ({ name,socketID  }) => {
            const grope = await Groups.find({ title: { $regex: `${name}` }})
            grope.forEach(gropes => {
                io.to(socketID).emit("get_Grope",grope)
            })
        })
        socket.on('add_to_grope', async ({ idGroup, user }) =>{
            const gropes = await Groups.findById(idGroup);
            if(gropes != null){
                await gropes.updateOne({
                    $push:{
                        players:{
                            id: user.userID,
                            userName: user.userName
                        }
                    }
                })
            }
        })
        socket.on('req_add_to_turnires', async ({gropes, socketID}) => {
            const grop = await Groups.findById(gropes)
            const registed = new Reg_teams({
                id: grop._id,
                title: grop.title,
                players: grop.players
            })
            registed.save()
        })
    })
};