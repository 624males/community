import React from 'react'
import {HashRouter,Link} from 'react-router-dom'
import {Breadcrumb} from 'antd'
import '../App.css'
function Siderbar() {
    return(
        <div id="siderbar">
            <HashRouter>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to='/'>/</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/sd'>sd</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/sb'>sb</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            </HashRouter>
        </div>
    )
}
export default Siderbar
