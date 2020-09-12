import React from 'react';
import Main1 from './Main/Main1'
import Main2 from './Main/Main2'
import Main3 from './Main/Main3'
import Main4 from './Main/Main4'
import {HashRouter,Route} from 'react-router-dom'
import '../App.css'

function Mainbody() {
    return(
        <HashRouter>
            <Route path="/" exact component={Main1} />
            <Route path="/sb/:s" component={Main2}/>
            <Route path="/sd"  component={Main3} />
            <Route path="/contents/:user" component={Main4}/>
        </HashRouter>
    )
}
export default Mainbody
