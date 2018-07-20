<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item><span style="margin:0 5px">></span>积分兑换</el-breadcrumb-item>
      <el-breadcrumb-item v-show="active===0&&active!==1"><span style="margin:0 5px">></span>积分规则</el-breadcrumb-item>
      <el-breadcrumb-item v-show="active===1&&active!==0"><span style="margin:0 5px">></span>兑换记录</el-breadcrumb-item>
      <el-breadcrumb-item v-show="active===2"><span style="margin:0 5px">></span>兑换详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-con">
      <div class="integral-list">
        <div class="flex-row justify-between cl">
          <div class="fl integral-list-title" v-on:click="active=0" v-show="active===0||!active&&active!==1">
            积分规则
          </div>
          <div class="fl integral-list-title" v-on:click="active=1" v-show="active===1||!active&&active!==0">
            兑换记录
          </div>
        </div>
      </div>
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
      item:null
    }
  },
  components:{
    'v-integral-list':IntegralList,
    'v-rule':Rule,
    'v-history':History,
    'v-details':Details
  },
  methods:{
    tabsClick:function (id) {
      this.active = id;
      console.log(id)
    },
    things:function (val,id) {
      this.active = val;
      if(id){
        this.item = id;
      }
    }
  },
  mounted(){
  },
}
</script>

<style>
  @import "../mine.css";
</style>
