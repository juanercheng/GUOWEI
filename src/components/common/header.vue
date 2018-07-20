<template >
  <div class="header-line"  style="position: relative"  >
    <div class="container header-text " style="padding: 21px 0" >
      <el-row class="content">
        <el-col :span="14">
          <div class="grid-content bg-purple left">
            <el-row class="content" >
              <el-col :span="5">
                <div class="grid-content bg-purple"
                     style="overflow: hidden;text-align: left;height: 44px;width:143px;margin-right: 4%">
                  <router-link to="/">
                    <img src="../../../src/assets/images/logo.png" class="img">
                  </router-link>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                <router-link
                  to="/Dashboard"
                  active-class="router-link-exact-active router-link-active"
                  class="left-content " >首页
                </router-link>
              </div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content bg-purple">
                  <router-link to="/news"
                               active-class="router-link-exact-active router-link-active"
                               class="left-content">
                    新闻 </router-link></div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple">
                <router-link to="/expressNew"
                             active-class="router-link-exact-active router-link-active"
                             class="left-content">
                   快报 </router-link></div></el-col>
              <el-col :span="3"><div class="grid-content bg-purple">
                <router-link to="/column"
                             active-class="router-link-exact-active router-link-active"
                             class="left-content">
                   专栏 </router-link></div></el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10" >
          <div class="grid-content bg-purple-light"
               style="position: relative;">
            <el-row   class="right-text" style="display: flex;flex-direction: row;justify-content: space-between;align-items: center">
              <el-col  :span="10" :style="$store.state.isSearch?'text-align:center':'text-align:right'">
                <div class="grid-content bg-purple">
                  <div v-if="!$store.state.isSearch" style="position: relative">
                    <img src="./../../../src/assets/images/search.png"
                         class="search-img1 i-img"
                         v-on:click="$store.commit('SetSearch',true)"/>
                    搜索
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
                         v-on:click="search='';$store.commit('SetSearchData',false)"/>
                  </div>
                </div>
              </el-col>
              <el-col :span="7"  style="position: relative;text-align: right">
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
                    <img src="./../../../src/assets/images/app.png" class="i-img"
                    />APP下载
                  </div>
                </el-popover>
              </el-col>
              <el-col :span="7" style="text-align: right">
                <div class="grid-content bg-purple">
                  <div v-if="!token" class="login">
                    <img src="./../../../src/assets/images/login.png"/>
                    <router-link to="/login" ><span style="color: #333;font-size: 16px">登录/注册</span></router-link>
                  </div>
                  <div v-else style="display: flex;flex-direction: row;align-items: center;justify-content: flex-end" class="loginBox">
                    <el-dropdown trigger="click"
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
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
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
        this.$message.error({
          message: '请输入关键字进行搜索',
          center: true
        })
        // this.$alert('请输入关键字', '温馨提示', {
        //   confirmButtonText: '确定',
        //   type: 'warning',
        //   callback: action => {
        //     console.log(32)
        //   }
        // });
      }else {
        this.$store.commit('SetSearchData',true)
        this.$router.push({
          path: './searchList',
          query: {searchVal: this.search}
        })
      }
    },
    handleCommand:function(command){
      console.log(command)
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
.header-left,.header-right{
  display: table-cell;
}
.header-line{
  border-bottom: 1px solid #ddd;
}
.content{
  display: flex;
  align-content: center;
  align-items: center;
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
.router-link-exact-active ,.router-link-active{
  color: #f15929;
  font-size: 18px;
}
.right-text{
  font-size: 16px;
}
.i-img{
  margin-right: 10px;
}
/*.app-img{*/
  /*z-index: 999;*/
  /*position: absolute;*/
  /*top: 153%;*/
  /*right: 21.5%;*/
  /*padding:26px 26px 0 26px;*/
  /*background-color: #fff;*/
  /*border:1px solid #ddd;*/
/*}*/
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
.search-img1{
  position: absolute;
  width: 14px;
  height: 14px;
  top: 0px;
  right: 15%;
}

.search-img{
  position: absolute;
  left:0;
  width: 14px;
  height: 14px;
  top: 1px;
}
.{
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
.el-col-3 {
  width: 13.5%;
}
.el-col-7 {
  width: 27.16667%;
}
</style>
