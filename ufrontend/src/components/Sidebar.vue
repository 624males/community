<template>
  <div class="Sidebar">
  	<section class="author">
  		<p>用户</p>
      <div>
        <p class="score">ID：{{userinfor.id}}</p>
  </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
  	return {
  		userinfor: {},
  		recent_topics: [],
  		recent_replies: [],
  	};
  },
  methods: {
  	getData() {
  		this.$http.get(`http://localhost:3000/`,)
				.then(res => {
            this.issLoading = false;
            this.userinfor = res.data.res
          }
					)
				.catch(err => {
					console.log(err)
				})
  	},
  },
  beforeMount() {
      this.getData();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
	padding: 0 12px;
}
section {
	background-color: #fff;
  margin-bottom: 10px;
}
section:last-child {
  margin-bottom: 0px;
}
section>p:first-child {
	background-color: #f6f6f6;
	padding: 10px;
  color: #444;
  font-size: 13px;
}
section.author>div {
  padding: 10px;
}
section.author img {
  width: 48px;
  height: 48px;
  vertical-align: middle;
}
section.author span {
  margin-left: 1em;
}
section.author .score {
  font-size: 14px;
  margin-top: 1em;
  line-height: 2em;
}
section>ul {
  padding: 10px;
}
section>ul>li {
  font-size: 14px;
  line-height: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
section>ul>li>a {
  color: #778087;
}
</style>
