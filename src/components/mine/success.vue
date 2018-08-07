<template>
<div >
  <img
    :src="$parent.type==='authenticationMine'?require('../../../src/assets/images/mine/wait.png'):this.$parent.type==='addArticle'?require('../../../src/assets/images/mine/sh.png'):require('../../../src/assets/images/mine/ok.png')"
    class="ok-img"
    :style="this.$parent.type==='authenticationMine'?'margin-top:100px':this.$parent.type==='addArticle'?'margin-top:80px':'margin-top:50px'"
  />
  <div style="font-size: 20px;margin-top: 40px" v-if="this.$parent.type==='addArticle'">审核中...</div>
  <div class="success-msg" :style="this.$parent.type==='addArticle'?'margin-top:18px':'margin-top: 42px;'">{{msg}} </div>
  <button class="btn btn-default "
            @click="goback"
            v-show="this.$parent.type!=='addArticle'"
            :style="this.$parent.type==='authenticationMine'?'margin-bottom: 194px':this.$parent.type==='password'||this.$parent.type==='userInfo'?'margin-bottom: 221px':'margin-bottom: 185px'"
            style="margin-top: 80px">返回首页</button>
  <button class="btn btn-default "
          @click="gobackArticle"
          v-show="this.$parent.type==='addArticle'"
          style="margin-top: 80px">返回文章</button>
</div>
</template>

<script>
export default {
  name: "success",
  data(){
    return{
      msg:null
    }
  },
  methods:{
    goback:function () {
      this.$router.push({
        path: '/'
      })
    },
    gobackArticle:function () {
      this.$router.push({
        path: '/mine/article'
      })
    }
  },
  mounted(){
    if(this.$parent.type==='userInfo'){
      this.msg='个人资料编辑成功'
    }else if(this.$parent.type==='authenticationMine'){
      this.msg='申请已提交，请耐心等待审核'
    }else if(this.$parent.type==='password'){
      this.msg='密码设置成功'
    }else if(this.$parent.type==='addArticle'){
      this.msg='文章提交完成需后台审核通过后方可发布成功'
    }
  }
}
</script>

<style>
  @import "./mine.css";
</style>
