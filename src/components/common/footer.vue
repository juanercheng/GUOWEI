<template>
  <div class="footer" ref="footer">
    <div class="container " style="padding-bottom: 24px">
      <el-row class="content">
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-row class="img-box" v-if="data1" >
              <el-col :span="24"><div class="grid-content bg-purple"><div class="title">战略合作</div></div></el-col>
              <el-col :span="4"  class="test1" v-for="item in data1" :key="item.id">
                <div class="grid-content bg-purple">
                  <img :src='item.image'
                       @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
                       style="width:102px;height: 27px">
                </div>
              </el-col>
             </el-row>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content bg-purple-light">
            <el-row class="img-box text-right" v-if="data2">
              <el-col :span="24"><div class="grid-content bg-purple"><div class="title">合作内容</div></div></el-col>
              <el-col :span="4"  class="test1" v-for="item in data2" :key="item.id">
                <div class="grid-content bg-purple">
                  <img :src='item.image'
                       @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
                       style="width: 86px;height: 27px">
                </div>
              </el-col>
             </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="line"></div>
      <div class="bottom">
        <div class="fl small item-left text-left">
          copyright &copy; 果味财经 版权所有 沪ICP备17034336号-3
        </div>
        <div class="text-right about item-right">
          <router-link :to="{name:'about',params:{titleName:'aboutUs'}}" class="small"><span>关于我们</span></router-link>
          <router-link :to="{name:'about',params:{titleName:'joinUs'}}" class="small"><span>加入我们</span></router-link>
          <router-link :to="{name:'about',params:{titleName:'contactUs'}}" class="small"><span>联系我们</span></router-link>
          <router-link :to="{name:'about',params:{titleName:'copyrightNotice'}}" class="small"><span style="border-right: none">版权申明</span></router-link>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  import API from '../../assets/js/api'
  export default {
    name: "footerGuo",
    data(){
      return{
        cooperationContent:API.api.cfg.cooperationContent,
        strategicCooperation:API.api.cfg.strategicCooperation,
        data1:null,
        data2:null,
      }
    },
    methods:{
      getDatas:function () {
        let _this = this
        let params = {
          pageCurrent:1,
          pageSize:100,
        };
        _this.getData(_this.cooperationContent,params,function (res) {
          if(res.code===0){
            _this.data1=res.object
          }
        });
        _this.getData(_this.strategicCooperation,params,function (res) {
          if(res.code===0){
            _this.data2=res.object
          }
        })
      }
    },
    mounted(){
      this.getDatas()
    }
  }
</script>

<style scoped>
  .footer{
    font-size: 20px;
    color: #ddd;
    width: 100%;
    background-color: #333333;
  }
  .test{
    margin-right:3%;
  }
  .test1{
    margin-right: 9%;
  }
  .title{
    margin-top: 40px;
    margin-bottom: 46px;
    text-align: left;
    color: #ddd;
    vertical-align: middle;
  }
  .img-box img{
    margin-right: 32px;
    margin-bottom: 21px;
    cursor: pointer;
    float: left;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: rgba(153, 153, 153,1);
    opacity: 0.17;
    margin:5.3% 0 20px 0;
  }
  .bottom{
    line-height: 14px;
    clear: both;
  }
  .small{
    font-size: 14px;
    color: #999;
  }
  .about span{
    border-right: 2px solid rgba(153, 153, 153, 0.17);
    padding: 0 10px;
    cursor: pointer;
  }
  .small span:hover{
    color: #fffefe;
  }
</style>
