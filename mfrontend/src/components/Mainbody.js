import React from 'react';
import Main1 from './Main/Main1'
import Managers from './Main/Managers'
import ManagerInfo from './Main/ManagerInfo'
import {HashRouter,Route} from 'react-router-dom'
import '../App.css'

function Mainbody() {
    return(
        <HashRouter>
                {/*在Route中使用exact精确匹配防止在调用其他路由时也误匹配到主页*/}
                <Route path="/" exact component={Main1} />
                <Route path="/manager/:user" component={Managers}/>
                <Route path="/contents/:user" component={ManagerInfo}/>
        </HashRouter>
    )
}
export default Mainbody
