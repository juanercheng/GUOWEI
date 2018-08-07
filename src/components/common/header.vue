<template >
  <div class="header-line" style="position: relative"  >
    <div class="container head-text cl" >
      <div class="fl content head01">
        <div class="fl header01">
          <div  class="logo-box">
            <router-link to="/">
              <img src="../../../src/assets/images/LOGO.svg" class="img">
            </router-link>
          </div>
        </div>
        <div class="fl header02">
          <div class="cl">
            <div class="fl click-item">
              <router-link
                to="/Dashboard"
                active-class="router-link-exact-active router-link-active"
                :class="$store.state.activeTab==='Dashboard'?'router-link-exact-active router-link-active':null"
                class="left-content"
                @click.native="go('Dashboard')"
              >首页
              </router-link>
            </div>
            <div class="fl click-item">
              <router-link to="/news"
                           active-class="router-link-exact-active router-link-active"
                           @click.native="go('news')"
                           :class="$store.state.activeTab==='news'?'router-link-exact-active router-link-active':null"
                           class="left-content">
                新闻 </router-link>
            </div>
            <div class="fl click-item">
              <router-link to="/expressNew"
                           active-class="router-link-exact-active router-link-active"
                           :class="$store.state.activeTab==='expressNew'?'router-link-exact-active router-link-active':null"
                           @click.native="go('expressNew')"
                           class="left-content">
                快报 </router-link>
            </div>
            <div class="fl click-item">
              <router-link to="/column"
                           active-class="router-link-exact-active router-link-active"
                           :class="$store.state.activeTab==='column'?'router-link-exact-active router-link-active':null"
                           @click.native="go('column')"
                           class="left-content">
                专栏 </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="rt header03 head02 content">
        <div class="cl content" >
          <div class="rt test01" style="margin-top: 0px!important;">
            <div v-if="!$store.state.isSearch" class="cl"
                 style=""
                 v-on:click="$store.commit('SetSearch',true)">
              <img src="./../../../src/assets/images/search.png"
                   class=" i-img fl"
              />
              <div class="fl">搜索</div>
            </div>
            <div v-else class="search" id="search">
              <img src="./../../../src/assets/images/search.png"
                   class="search-img i-img"
                   v-on:click="doSearch"/>
              <input placeholder="请输入关键字搜索"
                     v-model="search"
                     maxlength="30"
                     @keyup.enter ="doSearch"
                     class="search-input"/>
              <img v-if="isClicked"
                   src="./../../../src/assets/images/delete.png"
                   class="delete-btn i-img"
                   v-on:click="search='';$store.commit('SetSearch',false)"/>
            </div>
          </div>
          <div class="rt right-box02">
            <el-popover
              placement="top-start"
              style="padding: 10px 0;"
              width="100"
              trigger="hover">
              <div class="app-img text-center">
                <img src="./../../../src/assets/images/qcode.png" />
                <div style="font-size: 16px;padding: 7px 0 11px 0">扫码下载APP</div>
              </div>
              <div class="grid-content bg-purple" slot="reference">
                <img src="./../../../src/assets/images/app.png" class="i-img"/>APP下载
              </div>
            </el-popover>
          </div>
          <div class="rt test03">
            <div v-if="!token" class="login">
              <img src="./../../../src/assets/images/login.png"/>
              <router-link to="/login" ><span style="color: #333;font-size: 16px">登录/注册</span></router-link>
            </div>
            <div v-else
                 class="loginBox">
              <el-dropdown trigger="click" slot="dropdown"
                           @command="handleCommand">
                <div class="el-dropdown-link flex-row justify-center">
                  <img :src="$store.state.userInfo" class="user-imgs"/>
                  <img class="down"
                       :src="down?require('./../../../src/assets/images/up.png'):require('./../../../src/assets/images/down.png')"/>
                </div>
                <el-dropdown-menu
                  slot="dropdown"
                  visible-change
                  class="text-center">
                  <el-dropdown-item
                    command="a"
                    class="mineLi" >个人资料</el-dropdown-item>
                  <el-dropdown-item
                    class="mineLi"
                    command="b"
                    divided>退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "headerGuo",
    props:['token'],
    data(){
      return {
        isLogin:sessionStorage.getItem('token'),
        search:null,
        // isSearch:false,
        isClicked:true,
        down:false,
      }
    },
    methods: {
      doSearch:function () {
        if(!this.search){
          return
        }else {
          this.$store.commit('SetSearchData',true)
          this.$store.commit('SetActiveTab',null)
          this.$router.push({
            path: './searchList',
            query: {searchVal: this.search}
          })
        }
      },
      handleCommand:function(command){
        console.log(command)
        this.$store.commit('SetActiveTab',null)
        // this.down=!this.down
        if(command==='a'){
          this.$router.push({
            path: '/mine',
          })
        }else {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('headPortrait');
          sessionStorage.removeItem('userid');
          this.$emit('is-login',sessionStorage.getItem('token'))
          if(this.$route.path.indexOf('mine')!=-1){
            this.$router.push({
              path: '/'
            })
          }
        }
      },
      go:function (path) {
        this.$store.commit('SetActiveTab',null)
      }
    },
    watch:{
      'search':function (val) {
        console.log(val)
        // if(!val){
        //   this.$store.commit('SetSearchData',false)
        // }else {
        //   this.$store.commit('SetSearchData',true)
        // }
      }
    },
    mounted(){
      if(!this.$store.state.userInfo){
        this.$store.commit('setUpheadPortrait',sessionStorage.getItem('headPortrait'))
      }
    },
  }
</script>

<style scoped>
  .head-text{
    padding: 20px 0;display: flex;flex-direction: row;align-self: center;justify-content: space-between;
  }
  .header-line{
    border-bottom: 1px solid #ddd;
    /*width: 100%;*/
  }
  .logo-box{
    overflow: hidden;text-align: left;
    height: 44px;width:143px;
  }
  .loginBox{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:flex-end;
    position: relative;
  }
  .content{
    display: flex;
    align-content: center;
    align-items: center;
    position: relative;
  }
  .right-box02{
    margin-left: 43px;
    margin-right: 73px;
  }
  .header01{
    margin-right: 68px;
  }
  .header03{
    /*line-height: 40px;*/
  }
  .bg-purple{
    cursor: pointer;
  }
  .left-content{
    font-size: 18px;
    color: #333;
  }
  .left-content:hover{
    color: #f15929;
    font-size: 18px;
  }
  .click-item{
    margin-right: 60px;
  }
  .router-link-exact-active ,.router-link-active{
    color: #f15929;
    font-size: 18px;
  }

  .i-img{
    margin-right: 10px;
  }
  .app-img img{
    width: 100px;
    height: 100px;
  }
  .search{
    position: relative;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-top: 11px;
  }
  .search-img{
    position: absolute;
    left:0;
    width: 14px;
    height: 14px;
    top: 1px;
  }
  .search-input{
    border: none;
    font-size: 16px;
    /*padding-left: 20px;*/
    width: 75%;
  }
  .delete-btn{
    position: absolute;
    top: 2px;
    right: 0;
    width: 12px;
    height: 12px;
  }
  .down{
    width: 12px;
    height: 10px;
    margin-left:20px;
  }
  .mineLi:hover {
    color: #f2693e;
    background-color: transparent;
  }
  .el-dropdown-menu{
    top:74px!important;
  }
  .mineLi{
    font-size: 16px;
    letter-spacing: 0px;
    color: #333;
  }
  .user-imgs{
    width: 40px;
    height: 40px;
    border-radius: 50px;
  }
  @media screen and (max-width: 500px) {
    .head-text{
      display: flex;
      flex-direction: column;
    }
    .head01{
      margin-bottom: 20px;
    }
    .head02{
      flex-direction: row;
      justify-content: center;
    }
    .head01,.head02,.header02{
      width: 100%;
    }
    .header01{
      margin-right:10px;
    }
    .click-item{
      margin-right: 1px;
      width: 24%;
    }
    .el-popover__reference{
      min-width: 84px;
    }
    .el-dropdown-menu{
      top: 131px!important;
    }
    .search{
      /*min-width: 139px;*/
    }
  }
  @media screen and (max-width: 500px) {
    .head-text{
      display: flex;
      flex-direction: column;
    }
    .head01{
      margin-bottom: 20px;
    }
    .head02{
      flex-direction: row;
      justify-content: center;
    }
    .head01,.head02,.header02{
      width: 100%;
    }
    .header01{
      margin-right:10px;
      margin-bottom: 10px;
    }
    .click-item{
      margin-right: 1px;
      width: 24%;
    }
    .el-popover__reference{
      min-width: 84px;
    }
    .el-dropdown-menu{
      top: 131px!important;
    }
    .search{
      /*min-width: 139px;*/
    }
    .content{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    }
    .test01 {
      width: 100%;
      text-align: center;
      margin-bottom: 10px;
      padding-left: 8%;
      padding-bottom: 10px;
    }
    .right-box02,.test03{
      width: 36%;
      text-align: left;
      padding-left:8%;
    }
    .test01 img{
      width: 15px;
      height: 15px;
    }
    .right-box02{
      margin: 0;
    }
  }
  /*@media screen  and (max-width: 360px){*/
    /*.content{*/
      /*display: flex;*/
      /*flex-wrap: wrap;*/
      /*width: 100%;*/
    /*}*/
    /*.test01 {*/
      /*width: 100%;*/
      /*text-align: center;*/
      /*margin-bottom: 10px;*/
      /*padding:0 20px;*/
      /*padding-bottom: 10px;*/
    /*}*/
    /*.right-box02,.test03{*/
      /*width: 38%;*/
      /*text-align: left;*/
      /*padding-left: 6%;*/
    /*}*/
    /*.test01 img{*/
      /*width: 15px;*/
      /*height: 15px;*/
    /*}*/
    /*.right-box02{*/
      /*margin: 0;*/
    /*}*/
  /*}*/

</style>
