import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import {Layout, List, Button, Input } from 'antd'
const { Header, Footer, Sider, Content } = Layout

let socket
const ENDPOINT = 'http://localhost:5000/'
const Chat = ({location}) => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState()
    const [messages, setMessages] = useState([])
    
    useEffect(()=>{

    })
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
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Content>
                    <List
                        style={{height: '500px', overflowX: 'scroll'}}
                        size="large"
                        header={<div>Header</div>}
                        footer={<div>Footer</div>}
                        bordered
                        dataSource={messages}
                        renderItem={item => <List.Item>{`${item.user}: ${item.text}`}</List.Item>}
                    />
                </Content>
                <Sider>
                    <List
                        style={{height: '500px', overflowX: 'scroll'}}
                        size="large"
                        bordered
                        dataSource={users}
                        renderItem={item => <List.Item>{`${item.name}`}</List.Item>}
                    />
                </Sider>
            </Layout>
            <Footer>
                <>
                <Input
                    style={{width: '100%', padding: '24px'}}
                    type='text'
                    onChange={(event)=>setMessage(event.target.value)}
                    placeholder='Type your message'
                    onKeyPress={(event)=>event.key==='Enter' ? sendMessage(event) : null}
                    value={message}
                />
                <Button onClick={(event)=>sendMessage(event)}>Send</Button>
                </>
            </Footer>
        </Layout>
    )
}
export default Chat