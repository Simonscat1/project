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
    })
};