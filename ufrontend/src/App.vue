<!--主组件-->
<template>
  <div id="hello">
    <Header></Header>
    <main id="app_main">
      <router-view name="main"></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  data(){
    return{
      s:1,
      x:[3,30]
    }
  },
  components: {
    Header,
    Footer,
  },
}
</script>

<style>

#app_main {
  background-color: lightcoral;
  padding: 14px 0;
}
footer{
  bottom: 0;
}

</style>
