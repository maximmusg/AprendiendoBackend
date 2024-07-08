const { log } = require('console')
const EventEmitter = require('events')

class ChatRoom extends EventEmitter {

    join(user){
        console.log(`${user} joined the chat room.`);
        this.emit('user joined', user)
    }

    SendMeessage(user, message){
        console.log(`${user} send a message: ${message}`);
        this.emit('mesage', user, message)
    }

}

const ChatRoom = new ChatRoom()

ChatRoom.on('join', (user) => {
    console.log(`welcome ${user}`);  
})

ChatRoom.on('message', (user,message) => {
    console.log(`New message from ${user}: ${message}`);
})

ChatRoom.join('john')