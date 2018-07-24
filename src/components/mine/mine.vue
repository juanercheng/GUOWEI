<template>
<div class="content-mine">
  <div class="container">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><span v-on:click="$store.commit('SetSaveData',false)">{{nav.first}}</span></el-breadcrumb-item>
        <el-breadcrumb-item v-if="nav.second"><span style="margin:0 5px">></span>{{nav.second}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="nav.third"><span style="margin:0 5px">></span>{{nav.third}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="nav.fourth"><span style="margin:0 5px">></span>{{nav.fourth}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="con-box cl">
      <div class="left-mine fl ">
        <div class="left-user" @click="goUserInfo">
          <img :src="headPortrait?headPortrait:require('../../assets/images/mine/touxiang.png')"
               class="user-img"/>
          <div class="user-name">{{userName}}</div>
          <span v-if="userLevel"
                class="mineAuthentication"
                style="margin: 0 auto">{{userLevel}}</span>
        </div>
        <div class="left-menu" v-if="menu">
            <ul>
              <li v-for="item in menu"
                  :key="item.id"
                  v-on:click="tabsClick(item.id)"
                  :class="{actives:active === item.id}">
                <router-link :to="item.path"
                             :active="active">{{item.text}}</router-link></li>
            </ul>
          </div>
      </div>
      <div class="right-mine fl ">
        <router-view v-on:is-update="things" v-on:nav-fun="things2"></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import API from '../../assets/js/api'
export default {
  name: "mine",
  data(){
    return{
      userInfoUrl:API.api.user.userInfo,
      token:sessionStorage.getItem('token'),
      updateUser:null,
      userName:null,
      pushPosition:null,
      headPortrait:null,
      userLevel:null,
      msg1:'22',
      msg2:null,
      msg3:null,
      menu:[
        {id:0,text:'申请认证',path:'/mine/authentication'},
        {id:1,text:'积分兑换',path:'/mine/integral'},
        {id:2,text:'登录密码设置',path:'/mine/password'},
        {id:3,text:'我的文章',path:'/mine/article'},
      ],
      active:null,
      nav:{
        first:'个人中心',
        second:null,
        third:null,
        fourth:null
      }
    }
  },
  components:{},
  watch:{
    'updateUser':function(val){
      this.getUserInfo()  //编辑资料成功之后实时改变用户信息
    },
    'nav':function (val) {
      // console.log(val)
    }
  },
  methods:{
    getUserInfo:function(){
      let vm = this
      let params={
        token:sessionStorage.getItem('token')
      }
      vm.getData(vm.userInfoUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object;
          vm.userName = data.nickName?data.nickName:data.userName;
          vm.headPortrait = data.headPortrait;
          sessionStorage.setItem('score',data.score)
          switch ( data.userLevel) {
            case 0:
              data.userLevel = '未认证'
              break
            case 1:
              data.userLevel = '认证企业'
              break
            case 2:
              data.userLevel = '认证作者'
              break
            case 3:
              data.userLevel = '认证媒体'
              break
          }
          if (data.authStatus===0){
            data.userLevel = '认证中'
          }else if(data.authStatus===2){
            data.userLevel = '未通过'
          }
          vm.userLevel = data.userLevel;
          sessionStorage.setItem('userLevel',data.userLevel)
        }else if(res.code === 101){
          vm.$message('登录已失效，请重新登录！');
          vm.$router.push({
            path:'/login'
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    tabsClick:function (id) {
      this.active = id;
    },
    goUserInfo:function () {
      this.active =5
      console.log(this.active)
      this.$router.push({
        path:'/mine/userInfo'
      })
    },
    things:function (val) {
      this.updateUser = val;
    },
    things2:function (val) {
      this.nav=val
    }
  },
  mounted(){
    this.$emit('is-footer', true)
    this.getUserInfo()
  },
}
</script>

<style>
  @import "mine.css";
</style>
