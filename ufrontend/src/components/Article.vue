<template>
  <div class="Article">
    <router-link :to="{name:'UserInfor',params:{UserName:item.UserName}}">
      <b>作者：{{item.UserName}}</b>
    </router-link>
    <b>标题：{{item.Title}}</b>
    {{item.Module}}
    <div v-html="item.Content" class="article_content"></div>
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
  		item:'',
  	}
  },
  watch: {
    '$route'(to,from) {
      this.getArticle();
    },
  },
  methods: {
  	getArticle() {
  		this.$http.post('http://localhost:3000/users/article',{UserName:this.$route.params.UserName,Title:this.$route.params.Title})
				.then(res => {
					this.isLoading = false
						this.item = res.data
            //console.log(this.item)
          })
				.catch(err => {
					console.log(err)
				})
  	},
  },
  beforeMount() {
    	this.isLoading = false;
    	this.getArticle();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.article_loading {
  text-align: center;
  margin-top: 300px;
}
.article_wrap {
  width: 90%;
  margin: 0px auto;
}
.post {
  background-color: #fff;
  width: 74%;
}
.post .article_header {
  padding: 12px;
}
.post .title {
  margin: 6px 0;
  font-size: 22px;
  line-height: 130%;
  font-weight: bold;
  max-width: 75%;
}
.post .title>.top,.good {
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  background-color: #7bc500;
  border-radius: 4px;

  /*vertical-align: 8px;*/
}
.post .brief>li {
  display: inline-block;
  font-size: 12px;
}
.post .brief>li:before {
  content: "•";
  margin: 0px 2px;
}
.article_header {
  border-bottom: 1px solid #f0f0f0;
}
.article_content {
  margin: 10px;
  padding: 0 24px;
}
.reply {
  margin-top: 14px;
  width: 74%;
  background-color: #fff;
}
.reply_count {
  padding: 10px;
  background-color: #f6f6f6;
}
.reply_detail {
}
.reply_detail>li {
  position: relative;
  border-top: 1px solid #f0f0f0;
  padding: 12px;
  padding-bottom: 0px;
}
.reply_detail img {
  position: absolute;
  top: 12px;
  left: 12px;
  width: 30px;
}
.reply_detail_center {
  display: inline-block;
  margin-left: 32px;
  width: 90%;
}
.reply_detail_center p:first-child {
  font-size: 12px;
  margin-left: 0.5em;
  margin-bottom: 0.5em;
}
.reply_detail_center p:last-child {
  margin-left: 1em;
}
.reply_detail .ups {
  float: right;
}
</style>
