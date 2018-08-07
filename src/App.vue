<template>
  <div id="app">
    <v-header :token="token" v-on:is-login="things"></v-header>
    <router-view v-on:is-login="things" v-on:is-footer="things1"/>
    <v-footer v-show="footer"></v-footer>
  </div>
</template>

<script>
import header from './components/common/header'
import footer from './components/common/footer'
export default {
  name: 'App',
  data(){
    return{
      token:sessionStorage.getItem('token'),
      footer:true
    }
  },
  components: {
    'v-footer': footer,
    'v-header': header
  },
  methods:{
    things:function (val) {
      this.token = val;
    },
    things1:function (val) {
      this.footer = val
    },
    hidePanel: function(event){
      let sp = document.getElementById("search");
      if(sp){
        if(!sp.contains(event.target)&&!this.$store.state.hasData){
          this.$store.commit('SetSearch',false)
        }
      }
    },
  },
  mounted(){
    // this.things1()
  }
}
</script>

<style>
#app {
  font-family: Microsoft Yahei UI;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*height: 91%;*/
}
/*@media screen and (max-width: 500px) {*/
  /*#app{*/
    /*overflow :auto*/
  /*}*/
/*}*/
</style>
