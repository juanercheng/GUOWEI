<template>
  <div>
    <button class="btn btn-default"
            @click="back"
            style="margin: 0;padding: 2px 15px;position: absolute;top:11%;right: 3%;">返回</button>
    <div v-if="data.length!==0">
      <div v-if="data">
         <div v-for="item in data" class="item-integral flex-row justify-between cl">
          <div class="fl ">
            <div class="flex-row cl" style="justify-content: center;align-items: center">
              <img :src="item.currencyImg " class="btc-img fl"/>
              <div class="integral-list-con-names fl" style="integral-list-con-na">{{item.currencyName}}</div>
              <div class="integral-list-con-time fl">  {{item.createDate}}</div>
            </div>
          </div>
          <div class="rt"><div style="font-size: 24px;line-height: 48px;font-weight: 600;">- {{item.score||0 }}</div></div>
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
  name: "integralHistory",
  data(){
    return{
      listUrl:API.api.integral.getExchangeRecordList,
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
      }
      _this.getData(_this.listUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object.list;
          for (let i in data){
            data[i].createDate=data[i].createDate.substring(0,data[i].createDate.indexOf(' '))
          }
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
    back:function () {
      this.$emit('child-msg',null)
    }
  },
  mounted(){
    this.getList()
  },
}
</script>

<style>
  @import "../mine.css";
</style>
