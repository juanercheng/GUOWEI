<template>
  <div>
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item>个人中心</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item><span style="margin:0 5px">></span>积分兑换</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="active===0&&active!==1"><span style="margin:0 5px">></span>积分规则</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="active===1&&active!==0"><span style="margin:0 5px">></span>兑换记录</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="active===2"><span style="margin:0 5px">></span>兑换详情</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <div :class="!active&&active!==0&&active!==1?'bbg':null">
      <div class="integral-list">
        <div class="flex-row justify-between cl">
          <div class="fl integral-list-title jifen"
               v-on:click="active=0;$emit('nav-fun', {first:'个人中心', second:'积分规则', third:null, fourth:null});"
               v-show="active===0||!active&&active!==1">
            积分规则
          </div>
          <div class="fl integral-list-title"
               v-on:click="active=1;$emit('nav-fun', {first:'个人中心', second:'兑换记录', third:null, fourth:null});"
               v-show="active===1||!active&&active!==0">
            兑换记录
          </div>
        </div>
        <div style="margin: 17px 0 15px 0;font-size: 24px"
             v-if="!active&&active!==0&&active!==1" >我的积分：{{score}}</div>
      </div>
    </div>
    <div class="user-con">
      <v-rule v-if="active===0" v-on:child-msg="things"></v-rule>
      <v-history v-else-if="active===1" v-on:child-msg="things"></v-history>
      <v-details v-else-if="active===2" v-on:child-msg="things" :item="item"></v-details>
      <v-integral-list v-else="!active" v-on:child-msg="things"></v-integral-list>
    </div>
  </div>
</template>
<script>
import IntegralList from './integralList'
import Rule from './rule'
import History from './integralHistory'
import Details from './details'
export default {
  name: "integral",
  data(){
    return{
      tabs:[
        {id:0,name:'积分规则'},
        {id:1,name:'兑换记录'},
      ],
      active:null,
      item:null,
      score:sessionStorage.getItem('score')
    }
  },
  components:{
    'v-integral-list':IntegralList,
    'v-rule':Rule,
    'v-history':History,
    'v-details':Details
  },
  methods:{
    things:function (val,id) {
      this.active = val;
      this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
      if(id){
        this.item = id;
        this.$emit('nav-fun', {first:'个人中心', second:'积分兑换', third:'兑换详情', fourth:null});
      }
    }
  },
  mounted(){
    this.$emit('nav-fun', {first:'个人中心', second:'积分兑换', third:null, fourth:null});
  },
  beforeDestroy(){
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
}
</script>

<style>
  @import "../mine.css";
</style>
