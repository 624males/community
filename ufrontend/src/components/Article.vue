<template>
  <div class="Article">
    <div>
      <b>作者：<router-link :to="{name:'UserInfor',params:{UserName:item.UserName}}">{{item.UserName}}</router-link></b>
      <br/>
      <b>标题：{{item.Title}}</b>
      <br/>
      <b>模块：{{item.Module}}</b>
    </div>
    <div v-html="item.Content" class="article_content"></div>
    <!--在html插入图片等静态资源时需要将其插入static中，因为webpack会将其他文件如assets路径转换-->
    <div class="article_loading" v-if="isLoading">
      <img src="../assets/1.gif">
    </div>
  </div>

</template>

<script>
export default {
  name: 'Article',
  data() {
  	return {
  		isLoading: false,
  		item:''
  	}
  },
  watch: {
    //观测到路由跳转时调用getArticle
    '$route'(to,from) { // to , from 分别表示从哪跳转到哪，都是一个对象
      this.getArticle();
    },
  },
  methods: {
  	getArticle() {
      //this.$route.params获取当前url参数
  		this.$http.post('http://localhost:3000/users/article',{UserName:this.$route.params.UserName,Title:this.$route.params.Title})
				.then(res => {
					this.isLoading = false;
						this.item = res.data
          })
				.catch(err => {
					console.log(err);
				})
  	},
  },
  beforeMount() {
    	this.isLoading = false;
    	this.getArticle()
  },
}
</script>

<style>

</style>
