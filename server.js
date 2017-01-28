var net = require('net')
var streamSet = require('stream-set')
var jsonStream = require('duplex-json-stream')
var register = require('register-multicast-dns')

register(process.argv[2])
var friends = streamSet()

var server = net.createServer(function(socket){
  socket = jsonStream(socket)
  friends.add(socket)
	socket.on('data', function (data) {
    friends.forEach(function (friend) {
      if (friend !== socket) friend.write(data)
    })
	})
})

server.listen(8088)
