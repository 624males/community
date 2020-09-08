<template>
  <div class="Pagination">
  	<div class="btns">
  		<button @click="changepage(1)">首页</button>
  		<button v-if="morePrevious" @click="changepage(currentPage-5)">......</button>
  		<button :class="[{currentPage: btn === currentPage},'pagebtn']" v-for="btn in pagebtns" @click="changepage(btn)">{{btn}}</button>
  		<button v-if="moreNext" @click="changepage(currentPage+5)">......</button>
  		<button @click="changepage(totalPage)">尾页</button>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['totalpage',],
  data() {
  	return {
  		currentPage: 1,
  		pagebtns: [],  		
  		totalPage: this.totalpage,
  		morePrevious: false,
  		moreNext: false,
  	};
  },
  methods: {
    //设置分页按钮
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
  },
  beforeMount() {
    this.currentPage = parseInt(sessionStorage.getItem('localCurrentPage')) || 1;
		this.setpagebtns();
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btns>button {
	width: 54px;
	height: 30px;
	color: #778087;
	background-color: #fff;
	border: 1px solid #ddd;	
	border-radius: 3px;
	outline: none;
	cursor: pointer;
}
.btns>.currentPage {
	color: white;
	background-color: #1f1b1b;
}
</style>
