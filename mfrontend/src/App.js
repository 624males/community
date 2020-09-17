import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Siderbar from "./components/Siderbar";
import Mainbody from "./components/Mainbody";
import React from 'react';
import {HashRouter} from 'react-router-dom'
import {Divider} from 'antd';

function App() {
  return (
    <div className="App">
        <HashRouter>
        <Header/>
        </HashRouter>
        <Divider orientation='left' plain/>{/*文字间的垂直分割用type="vertical"*/}
        <div className="main">
            <Siderbar/>
            <Mainbody/>
        </div>
        <Footer/>
    </div>
  );
}

export default App;
