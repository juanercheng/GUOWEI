<template>
  <div>
    <div class="integral-list-con" v-if="data.length!==0">
      <div  v-for="(item,index) in data"
            :id="item.id" :key="index"
           class="item-integral flex-row justify-between cl">
        <div class="fl ">
          <div class="flex-row cl" style="justify-content: center;align-items: center">
            <img :src="item.image"  class="btc-img fl"/>
            <div class="integral-list-con-name fl">{{item.currencyName}}</div>
            <div class="integral-list-con-price fl"><img src="../../../assets/images/mine/integral.png"/>{{item.score }}</div>
            <div class="integral-list-con-store fl">库存  {{item.count }}</div>
          </div>
        </div>
        <div class="rt">
          <el-button
            class="integral-list-con-btn"
            :disabled="item.count<=0"
            @click="send(item)"
            type="info" >立即兑换</el-button>
        </div>
      </div>
    </div>
    <div v-else style="margin: 80px">
      {{msg}}
    </div>
    <div class="next-page text-right"
         v-show="total!==0"
         style="margin: 30px 0 0 0">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        @prev-click="handleprevClick"
        @next-click="handlenextClick"
        :total="total/pageSizes * 10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import API from  './../../../assets/js/api'
export default {
  name: "integralList",
  props:['active'],
  data(){
    return{
      listUrl:API.api.integral.list,
      pageCurrent:1,
      pageSizes:5,
      total:null,
      msg:'正在加载...',
      data:[],
    }
  },
  methods:{
    getList:function(){
      let _this = this
      let params = {
        pageCurrent:_this.pageCurrent,
        pageSize:_this.pageSizes,
        token:sessionStorage.getItem('token')
      };
      _this.getData(_this.listUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object.list;
          _this.total = res.object.total
          if(_this.total===0){
            _this.msg='暂无数据'
          }else {
            _this.msg = '正在加载...'
          }
          _this.data = data
        }
      }, (res) => {
        console.log(res)
      })
    },
    handleCurrentChange:function(val){
      let _this = this
      _this.pageCurrent = val;
      _this.getList()
    },
    handleprevClick:function(){
      let _this = this
      _this.pageCurrent --;
      _this.getList()
    },
    handlenextClick:function(){
      let _this = this
      _this.pageCurrent ++;
      _this.getList()
    },
    send:function (id) {
      this.$emit('child-msg',2,id)
      // this.$emit('nav-fun', {first:'个人中心', second:'兑换记录', third:'兑换详情', fourth:null});
    }
  },
  mounted(){
    this.getList()
  }
}
</script>

<style>
  @import "../mine.css";
  .el-button--info.is-disabled, .el-button--info.is-disabled:active, .el-button--info.is-disabled:focus, .el-button--info.is-disabled:hover{
    color: #999;
    background-color: #f1f1f1;
    border-color: #f1f1f1;
  }
</style>
