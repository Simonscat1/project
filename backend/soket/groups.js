const Schema = require('../models/UserSchema.js');
const Groups = require('../models/Groups.js');

module.exports = function(io){
    io.on('connection', (socket) => {
        socket.on("grope_create", async (data) => {
            if(data != ''){
                const create_grope = new Groups({
                    title: data.title,
                    content: data.context,
                    image: data.avatar,
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
    })
};