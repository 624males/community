<template>
  <div class="footer">
  	<div class="wrap">
      <div id="aa" :style="{width:'600px', height:'300px'}" >
      </div>
  	</div>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data() {
    return {}
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  width: 90%;
  margin: 0 auto;
}
.footer {
  padding: 20px 0px;
}
.footer>p:first-child {
  color: #666;
  line-height: 2em
}
.footer>p:last-child {
  color: #ababab;
  line-height: 2em
}
</style>
