import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

function Main4(props) {

    useEffect(()=>{
        axios.get()
        }
    )

    return(
        <div>
            {props.match.params.user}{/*此处的user为路由定义时的参数名*/}
        </div>
    )
}
export default Main4
