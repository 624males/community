import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter} from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')

function Main2() {

    useEffect(()=>{
        axios.post('http://localhost:3000/manager/getmanager',localStorage.getItem('token')).then(
            (res)=>{
                alert(JSON.stringify(res.data))
            }
        )
    })

    return(
        <div id='main2'>

        </div>
    )
}

export default Main2
