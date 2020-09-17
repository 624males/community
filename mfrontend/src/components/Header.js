import axios from 'axios';
import React,{useState} from 'react'
import {Button,Menu,Input,Form,Drawer} from 'antd'
//useHistory利用history实现类组件的this.props.history.push(),同时需要将组件存在Router中
import {useHistory} from 'react-router-dom'

function Header(){

    const {SubMenu} = Menu;//引入subMenu
    const history = useHistory();
    /*
    函数组件依此创建数据域，类组件依靠formRef = React.createRef();
    form需要对应表单绑定
    */
    const [form] = Form.useForm();

    //定义表单中layout布局
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    //根据button名字来切换表单状态
    const [button,setButton] = useState('注册');
    //抽屉可见状态
    const [drawerVisible,setD] = useState(false);
    //内邀码输入栏可见状态
    const [codeVisible,setC] = useState(true);
    //表单的验证
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

    //用户注册
    const regist =()=>{
            if (button === '注册') {//根据按钮state不同提交表单至不同的服务端路由
                if(form.getFieldValue('ICode') === '521lczys') {//判断内邀码
                    axios.post('http://localhost:3000/manager/regist', form.getFieldsValue()).then((res)=>{
                        switch (res.data.code) {
                            case 1:
                                alert('注册成功');
                                break;
                            case -1:
                                alert('用户已存在');
                                break;
                            case -2:
                                alert('参数不齐全');
                                break;
                            default:
                                break;
                        }
                    })
                }  else {
                    alert('请输入正确内邀码')
            }
            } else {
                axios.post('http://localhost:3000/manager/login',form.getFieldsValue()).then(async (res)=> {
                    alert(res.data.desc);
                    if (res.data.code === 0) {
                        await localStorage.setItem('token',res.data.token);
                        await localStorage.setItem('managerInfo', res.data.managerInfo);
                        //usehistory无需传递props即可在父组件调用
                        history.push(`/manager/${form.getFieldValue('ManagerName')}`);
                    } else {
                        alert('请输入正确的用户名和密码');
                    }}
                )
            }
        };

    return (
        <div>
            <div id="header">
                {/*弹性盒模型初始主轴为水平*/}
                <Menu theme={'light'} style={{display:'flex' ,margin:'0 auto'}}>
                    <SubMenu title='用户' key={'用户'}>
                        <Menu.ItemGroup title='用户操作'>
                            <Menu.Item key={1} onClick={async ()=>{
                                await setButton('注册');
                                await setC(false);
                                setD(true)}}><b>注册</b>
                            </Menu.Item>
                            <Menu.Item key={2} onClick={async ()=>{
                                await setButton('登陆');
                                await setC(true);
                                setD(true)}}><b>登陆</b>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <SubMenu title='相关'>
                        <Menu.ItemGroup>
                            <Menu.Item key={3}><a href={'http://localhost:8080'}>同性交友♂</a></Menu.Item>
                            <Menu.Item><a href={'https://www.mylcz.top'}>竺宝日常</a></Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
                <Drawer visible={drawerVisible} onClose={()=>{setD(false)}} closable={false}>
                    <Form
                        //创建form（const [form] = Form.useForm()对象需要在表带绑定
                        form = {form}
                        {...layout}
                        //onfinish属性为一个参数为表单value的函数
                        onFinish={(values)=>{alert(JSON.stringify(values))}}
                    >
                        <Form.Item name='ManagerName' label='用户名' rules={x1}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name='Password' label='密码' rules={x2}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item hidden={codeVisible} name='ICode' label='内邀码' rules={x3}>
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
