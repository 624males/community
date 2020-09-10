import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')

function Main2() {

    const history = useHistory();

    const [Users,setUsers]=useState(['ds','sda','sa']);


    useEffect(()=>{
        axios.post('http://localhost:3000/manager/getmanager',localStorage.getItem('token')).then(
            async (res)=>{
                if (res.data.code != 0){
                    history.push('/');
                    alert('token过期，请重新登录')
                } else {
                    axios.get('http://localhost:3000/manager/getusers').then(
                        (res)=>{
                            let y = []
                            for (let i in res.data){
                                y.push(res.data[i].UserName)
                            }
                            {/*setUsers(y)时不断为何不断渲染*/}
                        }
                    )
                }
            }
        )
    })

    return(
        <div id='main2'>
            {Users}{/*usestate中state能不能为对象*/}
        </div>
    )
}

export default Main2
