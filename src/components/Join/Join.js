import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import FacebookLogin from 'react-facebook-login';

const Join = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [loggedin, setLoggedin] = useState(false)
    
    const responseFacebook = (response) => {
        console.log(response);
        setLoggedin(true)
        setName(response.name)
        setRoom('101')
    }
    const redirectUrl = `chat?name=${name}&room=${room}`
return (<div>
        <h1>Join</h1>
        {
            loggedin && name && room
            ?
                <Redirect to={redirectUrl} />
            :
                <FacebookLogin
                    appId="2417264378305959"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    scope="public_profile,user_friends"
                />
        }

    </div>
    )
}
export default Join