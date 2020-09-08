一、准备工作
1.使用vue-­cli脚手架搭建项目，参考我的文章：使用使用vue-­cli脚手架搭建项目
2.安装一些需要的插件：cnpm install axios github-markdown-css
3.在main.js文件引入要全局使用的插件：

import Axios from 'axios'
import 'github-markdown-css'
Vue.prototype.$http=Axios  //将Axios添加到全局vue的原型
二、页面和组件：
1.共建立三个页面：发布清单页（首页）、文章详情页、用户信息页。
2.在src/components中共创建7个组件：
Header(头部)、Footer(脚步)为三个页面的共有组件，构成页面的上下部分；
PostList(列表)为发布清单页的主体部分，Pagination(分页)为发布清单页的分页栏部分；
Ariticle(文章)为文章详情页的主体部分，SideBar(侧边栏)为文章详情页的右侧部分；
UserInfor为用户信息页的主体部分；

三、axios
1.创建axios请求，参考我的文章：vue.js中axios的使用

字符串拼接：
this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,)
在PostList和SideBar两个组件的axios中都使用了es6语法拼接字符串

四、vue-router
构建vue-router，参考我的文章：vue-router的使用
解决同一路由不同参数下，发生的组件复用，导致的页面不更新，可以使用路由监听。
五、组件通信：
PostList(父组件)通过props向Pagenation(子组件)传送了数据totalPage。
Pagenation(子组件)通过自定义事件向PostList(父组件)传送了数据currentPage。
组件通信的方法，参考我的文章：vue.js中的组件通信
六、Pagenation
Pagenation组件中用到了三个重要的函数：

设置分页按钮
setpagebtns() {              
        if (this.totalPage >= 5) {
            this.pagebtns = [1,2,3,4,5];
            this.moreNext = true;   
        } else {
            for (var i=this.totalPage;i > 0;i--) {
                this.pagebtns.unshift(i);
            };
        };
      if (this.currentPage !== 1) {
        console.log(this.currentPage)
        this.changePageBtns();
      }
    },
处理分页按钮
changePageBtns() {
      if (this.totalPage < 5) return;
      this.morePrevious = this.currentPage > 3 ? true : false;
      this.moreNext = this.currentPage < (this.totalPage -2) ? true : false;
      if (this.currentPage > 3 && this.currentPage < (this.totalPage -2)) {
        this.pagebtns = [this.currentPage-2,this.currentPage-1,this.currentPage,this.currentPage+1,this.currentPage+2,];
        console.log(this.pagebtns); 
      } else if (this.currentPage <= 3){
        this.pagebtns = [1,2,3,4,5,];
        // console.log(this.pagebtns);
      } else if (this.currentPage >= this.totalPage -2){
        this.pagebtns = [this.totalPage-4,this.totalPage-3,this.totalPage-2,this.totalPage-1,this.totalPage,];
        // console.log(this.pagebtns);
      };
    },
处理当前页
changepage(page) {
        //处理当前页
        if (page === this.currentPage) return;
        if (0 < page && page <= this.totalPage) {
            this.currentPage = page;
        } else if (page <= 0) { 
            this.currentPage = 1;
        } else if (page > this.totalPage) {
            this.currentPage = this.totalPage
        };
        //处理分页按钮
        this.changePageBtns();
      // 保存当前页到session并发送给父组件
      sessionStorage.setItem('localCurrentPage',this.currentPage);
      this.$emit('sendPage',this.currentPage);
    },
七、遇到的其它问题
Ariticle组件中markdown内容的样式混乱。
解决方案：
(1)安装插件：cnpm install github-markdown-css
(2)引入插件：import 'github-markdown-css'
(3)使用：在要使用markdown样式的块级元素中添加markdown-body类名。
当页面刷新时，PostList中的当前页(page)会被重置为1，而不是用户已经浏览到的页面。
解决方案：
(1)使用sessionStorage设置并保存变量localPage：
sessionStorage.setItem('localPage',this.page)
(2)在挂载开始之前将变量localPage赋值给page：
this.page = parseInt(sessionStorage.getItem('localPage')) || 1;
