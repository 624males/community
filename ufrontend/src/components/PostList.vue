<template>
  <div class="PostList">
    <div v-if="isLoading" class="loading">
      <img src="../assets/1.gif">
    </div>
    <div class="wrap" v-else>
      <ul class="list">
        <li>
          <span>全部</span>
          <span>日常</span>
          <span>心情</span>
          <span>技术&经验</span>
          <span>Q&A</span>
        </li>
        <li class="item" v-for="item in items.reverse().slice((page-1)*limit,page*limit)">
          <span class="count">
            <span><b>{{item.UserName}}</b></span>
            <span>{{item.Module}}</span>
          </span>
          <router-link :to="{name:'Article',params:{UserName:item.UserName,Title:item.Title}}">
            <span class="title">{{item.Title}}</span>
          </router-link>
          <span :style="{'float':'right'}">{{TurnTime(item.updatedAt)}}</span>
        </li>
        <el-pagination
          @current-change="renderList"
          :page-size="7"
          layout="total, prev, pager, next, jumper"
          :total="items.length">
        </el-pagination>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  name: 'PostList',
  data() {
  	return {
      isLoading: false,
  		page: 1,
  		limit: 7,
  		items: [],
      totalPage:20,
  	};
  },
  components: {
    Pagination,
  },
  methods: {
    renderList(value) {
      this.page = value;
      this.getData();
      localStorage.setItem('localPage',this.page);
    },
  	getData: function() {
  		this.$http.get('http://localhost:3000/users/titles').then(res => {
        this.isLoading = false;
  			this.items = res.data;
  			console.log(this.items);
  		}).catch(err => {
          console.log(err)
      })
  	},
    /**
     * @return {string}
     */
    TurnTime(str) {
      if (!str) {
        return '';
      }
      var time = new Date() - new Date(str);
      if (time < 0) {
        return '';
      } else if (time < 1000 * 60) {
        return '刚刚'
      } else if (time < 1000 * 60 * 60) {
        var minutes = parseInt(time / (1000 * 60))
        return minutes + ' 分钟前'
      } else if (time < 1000 * 60 * 60 * 24) {
        var hours = parseInt(time / (1000 * 60 * 60))
        return hours + ' 小时前'
      } else if (time < 1000 * 60 * 60 * 24 * 30) {
        var days = parseInt(time / (1000 * 60 * 60 * 24))
        return days + ' 天前'
      } else if (time < 1000 * 60 * 60 * 24 * 30 * 12) {
        var months = parseInt(time / (1000 * 60 * 60 * 24 * 30))
        return months + ' 个月前'
      } else {
        var years = parseInt(time / (1000 * 60 * 60 * 24 * 30 * 12))
        return years + ' 年前'
      }
    },
  },
  beforeMount() {
    this.isLoading = true;
    this.page = parseInt(localStorage.getItem('localPage')) || 1;
  	this.getData();
  },
  computed:{
    xx(){
      this.dialogFormVisible=true
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading {
  text-align: center;
  margin-top: 200px;
}
.wrap {
	width: 85%;
	margin: 0px auto;
}
.list {
  background-color: #fff;
}
.list>li:first-child {
	height: 40px;
	background-color: #f6f6f6;
}
.list>li:last-child {
  height: 30px;
  padding: 14px 12px;
}
.list>li:first-child>span {
	line-height: 40px;
	color: #71bc00;
	font-size: 14px;
	margin-left: 22px;
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
.item .count {
	width: 80px;
	text-align: center;
	color: #a08d9b;
	vertical-align: 8px;
}
.item a {
  vertical-align: 4px;
}
.item .title {
	margin-left: 4px;
  max-width: 70%;
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
