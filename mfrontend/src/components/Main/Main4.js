import '../../App.css'
import React,{useState,useEffect} from 'react'
import {Link,HashRouter,useHistory} from 'react-router-dom'
import axios from 'axios';

function Main4(props) {

    const history = useHistory()

    const [titles,setTitles] = useState([])
    let y;

    useEffect(()=>{
        axios.get(`http://localhost:3000/users/userinfo/${props.match.params.user}`).then((res=>{
            y = res.data
        }))
        }
    )

    const yy = ()=>{
        setTitles(y)
    }

    return(
        <div>
            {props.match.params.user}{/*此处的user为路由定义时的参数名*/}
            <button onClick={yy}>显示</button>
            {titles.map(item=>{
                return(
                    <div>
                        <li key={item.id}>
                            <b>{item.UserName}</b>
                                <a href={'http://localhost:8080/article/'+props.match.params.user+'/'+item.Title}>
                                    {item.Title}
                                </a>
                                <button onClick={()=>{
                                    axios.post('http://localhost:3000/manager/delete',{UserName:item.UserName,Title:item.Title}).then(async (res)=>{
                                        if (res.data == 1){
                                            await alert('删除成功')
                                        }
                                    })
                                }}>删除</button>
                            </li>
                    </div>)
            })}
        </div>
    )
}
export default Main4
