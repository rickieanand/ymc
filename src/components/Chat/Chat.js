import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
let socket
const ENDPOINT = 'http://localhost:5000/'
const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])

    useEffect(()=>{
        const {name, room} = queryString.parse(location.search)
        
        socket = io(ENDPOINT)
        
        setRoom(room)
        setName(name)
        console.log('before Joined')

        socket.emit('join', {name, room}, (error)=>{
            alert('Joined', error)
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [ENDPOINT, location.search])
    
    useEffect(() => {
        socket.on('message', message => {
          setMessages([ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, [messages]);
    
    const sendMessage = (event) => {
        console.log('sendMessage')
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    
    console.log('Message: ', message)
    console.log('Messages: ', messages)
    return (
        <div className='container'>
            <input type='text'
                onClick={(event)=>setMessage(event.target.value)}
                placeholder='Type your message'
                onKeyPress={(event)=>event.key==='Enter' ? sendMessage(event) : null}
            />
        </div>
    )
}
export default Chat