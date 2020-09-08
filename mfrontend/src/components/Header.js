import axios from 'axios';
import React,{useEffect,useState} from 'react'
import {Button,Menu,PageHeader,Input,Form,Drawer} from 'antd'
import {useHistory,HashRouter} from 'react-router-dom'



function Header(){

    const {SubMenu} = Menu
    const history = useHistory();
    const [form] = Form.useForm();//函数组件依次创建数据域，类组件依靠formRef = React.createRef();this.formRef.current.setFieldsValue(), <Form ref={this.formRef}创建

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    const [button,setButton] = useState('注册');
    const [b,setB] = useState(false);
    const [c,setC] = useState(true);
    const x1=[{
            required: true,
            min: 3,
            max:11,
            message: 'Please input correct username!',
        }];
    const x2=[{
        required: true,
        min: 3,
        max:11,
        message: 'Please input correct password!',
    }];
    const x3=[{
        required: true,
        message: 'Please input true iCode!',
    }];

    const regist =()=>{
            if (button == '注册') {
                if(form.getFieldValue('ICode') == '521lczys') {
                    axios.post('http://localhost:3000/manager/regist', form.getFieldsValue())
                }  else {
                    alert('请输入正确内邀码')
            }
            } else {
                axios.post('http://localhost:3000/manager/login',form.getFieldsValue()).then(async (res)=> {
                    await alert(res.data.desc);
                    if (res.data.code == 0) {
                        await localStorage.setItem('token',res.data.token)
                        await localStorage.setItem('managerInfo', res.data.managerInfo);
                        history.push(`/sb/${form.getFieldValue('ManagerName')}`);/*usehistory无需传递props即可在父组件调用*/
                    } else {
                        alert('请输入正确的用户名和密码')
                    }}
                )
            }
        };

    return (
        <div>
            <div id="header">
                <Menu theme={'dark'} style={{display:'flex' ,margin:'0 auto'}}>
                    <SubMenu title='用户' key={'用户'}>
                        <Menu.ItemGroup title='用户操作'>
                            <Menu.Item key={1} onClick={async ()=>{
                                await setButton('注册');
                                await setC(false);
                                setB(true)}}><b>注册</b></Menu.Item>
                            <Menu.Item key={2} onClick={async ()=>{
                                await setButton('登陆');
                                await setC(true);
                                setB(true)}}><b>登陆</b></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu title='相关'>
                        <Menu.ItemGroup>
                            <Menu.Item key={3}><a href={'http://localhost:8080'}>同性交友♂</a></Menu.Item>
                            <Menu.Item><a href={'https://www.mylcz.top/'}>竺宝日常</a></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>

                <PageHeader title="aaa" subTitle="gg"/>
                <Drawer visible={b} onClose={()=>{setB(false)}} closable={false}>
                    <Form
                        form = {form} /*创建form（const [form] = Form.useForm()对象需要在表带绑定*/
                        {...layout}
                        onFinish={(values)=>{alert(JSON.stringify(values))}
                        }>
                        <Form.Item name='ManagerName' label='用户名' rules={x1}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='Password' label='密码' rules={x2}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item hidden={c} name='ICode' label='内邀码' rules={x3}>
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{'margin-left':'70px'}} type="primary" onClick={regist}>
                                {button}
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        </div>
    );

}
export default Header
