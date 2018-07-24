<template>
  <div class="text-left"  style="font-size: 16px;">
    <div class="rule"
         v-if="data"
         v-html="data.content">
      {{data.content}}
    </div>
    <div class="text-center">
      <button class="btn btn-default " style="margin: 104px 0 59px 0" @click="back" >返回</button>
    </div>
  </div>
</template>

<script>
import API from  './../../../assets/js/api'
export default {
  name: "rule",
  data(){
    return{
      cfgUrl:API.api.cfg.clause,
      data:null,
    }
  },
  methods:{
    back:function () {
      this.$emit('child-msg',null)
    },
    getDatas:function () {
      let _this = this
      let params = {
        ClauseType:'SCORE_RULE'
      }
      _this.getData(_this.cfgUrl,params,function (res) {
        if(res.code===0){
          _this.data=res.object
        }
      })
    }
  },
  mounted(){
    this.getDatas()
  }
}
</script>

<style>
  @import "../mine.css";
</style>
