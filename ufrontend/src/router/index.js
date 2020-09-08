import Vue from 'vue'
import Router from 'vue-router'
import PostList from '../components/PostList'
import Article from '../components/Article'
import UserInfor from '../components/UserInfor'
import User from '../components/User'
import Regist from '../components/Regist'
import Login from '../components/Login'

Vue.use(Router)

export default new Router({
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
