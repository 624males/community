//获取用户所写文章
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
				.then((res) => {
            this.userinfor = res.data;
          }
        ).catch((err) => {
					console.log(err);
				})
  	},
  },
  mounted() {
  	this.getUserInfor();
  },
}
</script>

<style>

.loading {
  text-align: center;
  margin-top: 300px;
}

p{
  margin-bottom: 50px;
}

</style>
