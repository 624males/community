技术栈： view：Vue技术栈（axios、element-ui、vue-router）+eCharts（登录信息数据可视化） controller：node技术栈（koa2、sequelize、mongoose，jwt），sql:mysql，nosql:mongodb

实现流程：普通用户设计部分： Vue组件化规范页面，ui部分使用饿了么PC端框架，不同组件部分使用axios调用不同controller层路由接口，在主体部分显示数据 页面主体三部分：登陆注册页面在登陆前后提供不同的UI，echarts对逻辑层api调用接收到的数据进行可视化构图部分,页面内容展示

controller部分koa主要负责利用router进行API设计（用户功能部分API），利用对应orm操作数据库，jwt实现登录注册验证

后台管理员账号设计部分：
登录跳转后可对用户发言进行删除等操作
view部分由react重构前端请求资源时可能需要后端使用koa2-cors跨域资源共享才可访问到后端路由从数据库返回的数据
利用vue-router（router-view、router-link :to）和react-router-dom实现组件的局部更新切换利用(hook部分使用 useHistory)
	
