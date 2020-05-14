import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    return (<div>
        <h1>Join</h1>
        <div><input type='text' placeholder='Enter name' onChange={(event)=>setName(event.target.value)}/></div>
        <div><input type='text' placeholder='Enter room' onChange={(event)=>setRoom(event.target.value)}/></div>
        <Link onClick={(event)=>{(!name || !room) && event.preventDefault()}} to={`chat?name=${name}&room=${room}`}>
            <Button variant="contained" color="primary">Submit</Button>
        </Link>
    </div>
    )
}
export default Join