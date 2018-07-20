<template>
<div class="content-mine">
  <div class="container">
    <div style="height: 60px;width: 100%"></div>
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
        <router-view v-on:is-update="things"></router-view>
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
    }
  },
  components:{
  },
  watch:{
    'updateUser':function(val){
      this.getUserInfo()  //编辑资料成功之后实时改变用户信息
    },
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
          console.log( res.object)
          switch ( data.userLevel) {
            case 0:
              data.userLevel = '未认证'
              break
            case 1:
              data.userLevel = '企业认证'
              break
            case 2:
              data.userLevel = '作者认证'
              break
            case 3:
              data.userLevel = '媒体认证'
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
