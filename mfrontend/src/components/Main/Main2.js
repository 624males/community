import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')

function Main2() {

    const history = useHistory();

    useEffect(()=>{
        axios.post('http://localhost:3000/manager/getmanager',localStorage.getItem('token')).then(
            async (res)=>{
                if (res.data.code != 0){
                    await history.push('/');
                    alert('token过期，请重新登录')
                } else {
                    alert('登陆成功')
                }
            }
        )
    })

    return(
        <div id='main2'>

        </div>
    )
}

export default Main2
