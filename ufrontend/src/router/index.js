import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfor from '../components/UserInfor'
import User from '../components/User'
import Regist from '../components/Regist'
import Login from '../components/Login'
import Post from '../components/functions/Post'
import Rgirl from '../components/functions/Rgirl'
import Rent from '../components/functions/Rent'
import Serve from '../components/functions/Serve'
import Message from '../components/functions/Message'
//引入使用并导出router到main
Vue.use(Router);

export default new Router({
  //采用history模式将url中的#去掉
  mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Root',
			components: {
				main: PostList,
			},
		},
		{
			path: '/article/:UserName/:Title',
			name: 'Article',
			components: {
				main: Article,
			},
		},
		{
			path: '/user/:UserName',
			name: 'user',
			components: {
				main: User,
			},
		},
    {
     path: '/user/:UserName/message',
     name:'message',
     components: {
       main: Message,
     }
    },
    {
      path: '/user/:UserName/post',
      name:'post',
      components: {
        main: Post,
      }
    },
    {
      path: '/user/:UserName/rgirl',
      name:'rgirl',
      components: {
        main: Rgirl,
      }
    },
    {
      path: '/user/:UserName/rgirl/rent',
      name:'rent',
      components: {
        main: Rent,
      }
    },
    {
      path: '/user/:UserName/rgirl/serve',
      name:'serve',
      components: {
        main: Serve,
      }
    },
    {
      path: '/userinfor/:UserName',
      name: 'UserInfor',
      components: {
        main: UserInfor,
      }
    },
    {
      path: '/regist',
      name: 'Regist',
      components: {
        main: Regist,
      }
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        main: Login,
      }
    },
	],
})
