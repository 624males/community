import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')

function Main2() {

    const history = useHistory();

    const [Users,setUsers]=useState();


    useEffect(()=>{
        axios.post('http://localhost:3000/manager/getmanager',localStorage.getItem('token')).then(
            async (res)=>{
                if (res.data.code != 0){
                    history.push('/');
                    alert('token过期，请重新登录')
                } else {
                    axios.get('http://localhost:3000/manager/getusers').then(
                        (res)=>{
                            setUsers(JSON.stringify(res.data))
                        }
                    )
                    alert('登陆成功')
                }
            }
        )
    })

    return(
        <div id='main2'>
            {}
        </div>
    )
}

export default Main2
