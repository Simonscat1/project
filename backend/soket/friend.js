module.exports = function(io){
     io.on('connection', (socket) => {
          socket.on('friendRequest', (friend, callback)=> {
               console.log(friend)
          })
     })
}