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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app_main {
  background-color: #e1e1e1;
  padding: 14px 0px;
}

</style>
