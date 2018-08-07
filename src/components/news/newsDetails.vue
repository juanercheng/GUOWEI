<template>
  <!--整体布局-->
  <div class="container cl" v-if="datas">
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="font-size: 12px;margin: 20px 0 40px 0;padding: 0;">
      <el-breadcrumb-item v-if="parentType" style="color: #666">{{parentType}} > </el-breadcrumb-item>
      <el-breadcrumb-item style="color: #666">  文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--左边布局-->
    <div class="f_content fl" >
      <!--第一行的标题-->
      <div class="header-title" id="header-title" >
        <img src="../../../src/assets/images/home/hot.png" alt="" v-if="datas.tag===1" style="margin-right: 18px">
        <img src="../../../src/assets/images/home/new.png" alt="" v-if="datas.tag===2" style="margin-right: 18px">
        <span style="width: 799px;height: 65px;font-family: MicrosoftYaHeiUI;font-size: 26px;font-weight: 600;line-height:39px;letter-spacing: 0px;color: #2f2f2f;">{{datas.title}}</span>
      </div>
      <!--第二行的label-->
      <div class="details-label" >
        <span class="label_one"
              v-on:click="columnSpecial(datas.author)"
              style="font-size: 14px;cursor: pointer">{{datas.authorName}}</span>
        <span class="label_two " style="font-size: 14px;">{{datas.releaseDate}}</span>
        <span class="label_three" style="width: 110px; font-size: 14px;padding-right: 33px" v-if="datas.tag1||datas.tag2||datas.tag3">
          <img src="../../../src/assets/images/home/label.png" alt="" style="padding-right: 10px">

          <i @click="goLabel(datas.tag1)" style="font-style: normal;cursor: pointer" v-if="datas.tag1">{{datas.tag1}}</i>
          <i @click="goLabel(datas.tag2)" style="font-style: normal;margin: 0 3px;cursor: pointer" v-if="datas.tag2">{{datas.tag2}}</i>
          <i @click="goLabel(datas.tag3)" style="font-style: normal;cursor: pointer" v-if="datas.tag3">{{datas.tag3}}</i>
        </span>
        <span class="label_four" style="width: 44px; font-size: 14px;"><img src="../../../src/assets/images/home/eye.png" style="margin-right: 4px">  {{datas.lookTimes||0}}</span>
      </div>


      <div class="mainText" >
        <!--副标题-->
        <div class="samllTitle" style="margin-bottom:30px;">

          <span style="  font-size:14px;display: inline-block;
  font-weight:normal;
  line-height:24px;
  color:#5b5b5b;
  background-color: #f6f6f6;
  padding: 20px 30px;width: 100%;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;"><span style="font-weight: 600;">摘要：</span>{{datas.smallTitle}}</span></div>
        <div v-html="datas.mainText">{{datas.mainText}}</div>
      </div>
      <div class="container">
        <p class="shuoming">声明：本文由入驻果味财经的作者撰写，观点仅代表作者本人，绝不代表果味财经赞同其观点或证实其描述。</p>
      </div>
      <!--底部的编辑人和分享-->
      <div style="position: relative">
        <div class="cl share-box-11" >
          <div class="fl" style="color: #bcbcbc; padding-top: 9px;">
            责任编辑：{{datas.responsibleEditor }}
          </div>
          <div class="flex-row justify-center deta rt"
               style="color:#bcbcbc;">
            <div>分享到：</div>
            <el-popover
              popper-class="text-center"
              placement="top"
              width="120"
              trigger="click">
              <div id="qrcode" class="text-center flex-column justify-center"></div>
              <div style="margin: 5px 0">微信扫上面二维码</div>
              <div>分享至好友和朋友圈</div>
              <div slot="reference">
                <img src="../../../src/assets/images/news/微信.svg" alt="" @click="weiChat">
              </div>
            </el-popover>

            <!--<img src="../../../src/assets/images/news/circle.png" alt="">-->
            <img
              @click="qqClick"
              src="../../../src/assets/images/news/qq.svg" alt="">
            <img
              @click="weibo"
              src="../../../src/assets/images/news/微博.svg" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--广告位-->
    <!--右边布局-->
    <div class="rt left-con"
         :style="{marginTop:marginTop+'px'}"  >
      <div  class="img1"
            v-for="(item,index) in rightAd"
            :key="index"
            v-if="index <= 2"
            :class="!item?'border-line':null">
        <img :src='item.image'
             v-if="item"
             @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
             class="img"/>
        <div class="advertisement-text">推广</div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from  './../../assets/js/api'
  import QRCode from 'qrcodejs2'
  export default {
    name: "newsDetails",
    data(){
      return{
        newInfoAdvertisementUrl:API.api.news.newInfoAdvertisement, //首页广告接口
        newsIdUrl:API.api.news.newsId,
        datas:null,
        parentType:null,
        marginTop:null,
        rightAd:[],
        shareUrl:{
          qq:"http://connect.qq.com/widget/shareqq/index.html?",
          qqzone:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
          weibo:"http://v.t.sina.com.cn/share/share.php?",
          weixin:""
        }
      }
    },
    methods:{
      getAdData:function (){
        let _this = this
        let params={
          pageCurrent:1,
          pageSize:3
        }
        _this.getData(_this.newInfoAdvertisementUrl,params,function (res) {
          if (res.code === 0) {
            let data = res.object;
            let len,arr=[]
            if(data.length<3){
              len = 2 - data.length
              for (var i=0;i<=len;i++){
                arr.push({
                  image:null,
                })
                _this.rightAd=data.concat(arr)
              }
            }else {
              _this.rightAd=data;
            }
          }
        }, (res) => {
          console.log(res)
        })
      },

      _isMobile:function () {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },

      getDetails:function () {
        let _this = this
        let id = _this.id
        _this.GetJson(_this.newsIdUrl,id,function (res) {
          if (res.code === 0) {
            let data = res.object;
            if(data.releaseDate){
              data.releaseDate=_this.format(data.releaseDate)
            }
            _this.datas = data;
            _this.$nextTick(function () {
              if(_this._isMobile()){
                _this.marginTop=1+'px'
              }else {
                _this.marginTop=$('.mainText').position().top - 8
              }
            })
          }
        }, (res) => {
          console.log(res)
        })
        setTimeout(function(){
          _this.$emit('is-footer', true)
        },1000);
      },
      //左右对齐方法
      // duiqi:function(){
      //   height = datas.title.height,
      // }
      weiChat:function () {
        let _this = this
        document.getElementById("qrcode").innerHTML="";
        let qrcode="";
        qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 130,
          height: 130,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
        qrcode.makeCode(location.href);
        console.log(qrcode)
      },
      qqClick:function(){
        let _this = this
        _this.share("qq");
      },
      weibo:function(){
        let _this = this
        _this.share("weibo");
      },
      share:function(platform){//链接生成
        let _this = this
        var qqParameter={
          url:location.href,
          desc:"",
          title:_this.datas.title,
          summary:_this.datas.smallTitle, /*分享摘要(可选)*/
          site:'果味Pro',
          pics:_this.datas.image,
          flash: '', /*视频地址(可选)*/
          style:'201',
          width:32,
          height:32
        };
        var s = [];
        for(var i in qqParameter){
          s.push(i + '=' + encodeURIComponent(qqParameter[i]||''));
        }
        window.open(_this.shareUrl[platform]+s.join("&"),"blank");
      },
      goUrl:function (jumpType,jumpUrl,id) {
        console.log('jumpUrl',jumpUrl,jumpType)
        let _this = this
        if(jumpType){
          if(jumpType===1){
            window.open(jumpUrl, '_blank')
          }else if(jumpType===2){

          }else if(jumpType===3){

          }else {
            _this.id=id
            _this.getDetails()
          }
        }
      }
    },
    mounted(){
      this.id=this.$route.query.id;
      switch (this.$route.query.type) {
        case 'home':
          this.parentType = '首页'
          this.$store.commit('SetActiveTab','Dashboard')
          break
        case 'news':
          this.parentType = '新闻'
          this.$store.commit('SetActiveTab','news')
          break
        case 'column':
          this.parentType = '专栏'
          this.$store.commit('SetActiveTab','column')
          break
        case 'expressNew':
          this.parentType = '快报'
          this.$store.commit('SetActiveTab','expressNew')
          break
      }
      this.$emit('is-footer', false)
      this.getAdData()
      this.getDetails()
    }
  }
</script>

<style scoped>
  @import "newsDetails.css";
</style>
