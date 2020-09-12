<template>
	<div class="UserInfor">
		<div class="main">
	  	<div class="loading" v-if="isLoading">
	  		<img src="../assets/1.gif">
	  	</div>
      <p>所写文章:</p>
	  	<div v-for="item in userinfor">
        <router-link :to="{name:'Article',params:{UserName:item.UserName,Title:item.Title}}">
	  		{{item.Title}}
        </router-link>
	  </div>
	</div>
  </div>
</template>

<script>
export default {
  name: 'UserInfor',
  data() {
  	return {
      userinfor:[]
  	}
  },
  watch: {
  	'$route'(to,from) {
  		this.getUserInfor();
  	},
  },
  methods: {
  	getUserInfor() {
  		this.$http.get(`http://localhost:3000/users/userinfo/${this.$route.params.UserName}`,)
				.then(res => {
            this.userinfor = res.data
          }
        ).catch(err => {
					console.log(err)
				})
  	},
  },
  mounted() {
  	this.getUserInfor();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  text-align: center;
  margin-top: 300px;
}
.wrap {
	width: 90%;
	margin: 0px auto;
}
.user {
	max-width: 74%;
}
.user_home>p:first-child span:first-child{
	color: #80bd01;
}
.user_home>p:first-child span:last-child{
  padding: 0 5px;
  color: #ccc;
}
.user_home .user_middle {
	padding: 10px;
	border-top: 1px solid #f0f0f0;
}
p{
  margin-bottom: 50px;
}
.user_home .user_middle .user_avatar img {
	width: 40px;
	vertical-align: middle;
}
.user_home .user_middle .score {
	font-size: 14px;
	line-height: 3em;
}
.user_home p:last-child {
	font-size: 14px;
  color: #ababab;
  border-top: none;
}
section {
  background-color: #fff;
  margin-bottom: 1em;
  border-radius: 3px 3px 0 0;
}
section:last-child {
  margin-bottom: 0;
}
section p:first-child {
	padding: 10px;
  background-color: #f6f6f6;
  font-size: 14px;
}
section p:last-child {
	padding: 10px;
  font-size: 14px;
	border-top: 1px solid #f0f0f0;
}
.item {
	height: 30px;
	padding: 10px 12px;
	border-top: 1px solid #f0f0f0;
}
.item:hover {
	background-color: #f6f6f6;
}
.item img {
	width: 30px;
	height: 30px;
}
.item span {
	display: inline-block;
	font-size: 12px;
}
.item a {
  vertical-align: 4px;
}
.item .title {
	margin-left: 16px;
	width: 75%;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item .title:hover {
  text-decoration: underline;
}
.item .time {
	float: right;
	width: 60px;
	text-align: right;
	margin-left: 4px;
	line-height: 30px;
}
.item .mini-img {
	float: right;
	width: 16px;
	height: 16px;
	margin: 7px 0;
}
</style>
