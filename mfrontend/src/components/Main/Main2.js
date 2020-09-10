import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token')

function Main2() {

    const history = useHistory();

    const [Users,setUsers]=useState([{id: "1", UserName: '张三', title: "zs"}, {id: "2", UserName: "李四", title: 'ls'}]);


    useEffect(()=>{
        axios.post('http://localhost:3000/manager/getmanager',localStorage.getItem('token')).then(
            async (res)=>{
                if (res.data.code != 0){
                    history.push('/');
                    alert('token过期，请重新登录')
                } else {
                    alert('成功获取数据')
                }//在渲染时更改state或者props会导致再次渲染然后获取数据导致死循环
            }
        )
    })

    return(
        <div id='main2'>
            {Users.map(item=>{
                return  <li key={item.id}>{item.UserName}</li>}/*在JSX中不能在子组件中渲染对象，当渲染数组时会将数组转化为字符串*/
                )}
            <button onClick={()=>{
                axios.get('http://localhost:3000/manager/getusers').then(
                    (res)=>{
                        setUsers(res.data)
                        {/*setUsers(y)时不断为何不断渲染*/}
                    }
                )
            }}>aa</button>
        </div>
    )
}

export default Main2
