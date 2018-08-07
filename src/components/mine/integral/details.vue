<template>
<div v-if="item">
  <img :src="item.image" class="btc-img-details"/>
  <div style="font-size: 20px">{{item.currencyName}}</div>
  <div style="color: #f15929;font-size: 18px;margin-top: 15px"><img src="../../../assets/images/mine/integral.png"/> {{item.score}}</div>
  <div style="position: relative">
    <input placeholder="请输入钱包地址"
           v-model.trim="address"
           maxlength="34"
           class="integral-address"/>
    <div class="warning" v-show="isWarning">
      <div class="warning-mine"
           style="text-align: center;width: 100%;margin-top: 10px;position: absolute;bottom:-38px;font-size: 14px"
           v-show="isWarning">请输入钱包地址！</div>
    </div>
  </div>
  <div>
    <button
      class="btn btn-active"
      @click="send"
      style="margin-top: 9.4%;margin-bottom:18.5%">提交</button>
  </div>
</div>
</template>

<script>
import API from  './../../../assets/js/api'
export default {
  props: ['item'],
  data(){
    return {
      Url:API.api.integral.exchangeRecord,
      address:null,
      isWarning:false
    }
  },
  name: "details",
  methods:{
    send:function () {
      let _this = this
      if(!_this.address){
        // _this.$message({
        //   message: '请输入钱包地址！',
        //   center: true,
        //   type:'warning',
        // });
        _this.isWarning=true
        return
      }
      let params = {
        currencyId:_this.item.id,
        purseAddress:_this.address,
        token:sessionStorage.getItem('token')
      }
      _this.postData(_this.Url,params,function (res) {
        console.log(res)
        if (res.code === 0) {
          _this.isWarning=false
          _this.$message({
            message: '提交成功',
            center: true,
            type:'success',
            duration:1000
          });
          setTimeout(function(){
            _this.$emit('child-msg',null)
          },1500);
        }else {
          _this.$message.error({
            message: res.msg,
            center: true
          })
        }
      }, (res) => {
        console.log(res)
      })

    }
  },
  mounted(){
    // console.log(this.item)
  }
}
</script>

<style scoped>
.integral-address{
  font-size: 14px;background-color: #fff;border-bottom: 1px solid #ddd;text-align: center;padding: 10px ;margin-top:6%
}
</style>
