<template>
  <!--整体布局-->
  <div class="container cl">
    <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="font-size: 12px;color: #666;margin: 20px 0 39px 0;position: absolute; top: 0%;left: 0%;">
      <el-breadcrumb-item>文章 > </el-breadcrumb-item>
      <el-breadcrumb-item >  文章详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!--左边布局-->
    <div class="f_content fl" v-if="datas">
      <!--第一行的标题-->
      <div class="title" >
        <img src="../../../src/assets/images/home/hot.png" alt="" v-if="datas.tag===1" style="margin-right: 18px">
        <img src="../../../src/assets/images/home/new.png" alt="" v-if="datas.tag===2" style="margin-right: 18px">
        <span style="	width: 799px;
	height: 65px;
	font-family: MicrosoftYaHeiUI;
	font-size: 26px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 39px;
	letter-spacing: 0px;
	color: #2f2f2f;">{{datas.title}}</span>
      </div>
      <!--第二行的label-->
      <div class="details-label" >
        <span class="label_one"
              v-on:click="columnSpecial(datas.author)"
              style="font-size: 14px;cursor: pointer">{{datas.authorName}}</span>
        <span class="label_two " style="font-size: 14px;">{{datas.releaseDate}}</span>
        <span class="label_three" style="width: 110px; font-size: 14px;padding-right: 33px" v-if="datas.tag1||datas.tag2||datas.tag3">
          <img src="../../../src/assets/images/home/label.png" alt="" style="padding-right: 10px">
          <i @click="goLabel(datas.tag1)" style="font-style: normal;cursor: pointer">{{datas.tag1}}</i>
          <i @click="goLabel(datas.tag2)" style="font-style: normal;margin: 0 3px;cursor: pointer">{{datas.tag2}}</i>
          <i @click="goLabel(datas.tag3)" style="font-style: normal;cursor: pointer">{{datas.tag3}}</i>
        </span>
        <span class="label_four" style="width: 44px; font-size: 14px;"><img src="../../../src/assets/images/home/eye.png" style="margin-right: 4px">  {{datas.lookTimes||0}}</span>
      </div>
      <div class="mainText" >
        <img :src="datas.image" v-if="datas.image" class="img">
        <div v-html="datas.mainText">{{datas.mainText}}</div>
      </div>
      <div style="width: 100%;font-size:16px;font-weight:normal;line-height:36px;	color:#5b5b5b;background-color: #f7f9fa;padding: 15px 0 15px 16px">
        声明：本文由入驻果味财经的作者撰写，观点仅代表作者本人，绝不代表果味财经赞同其观点或证实其描述。
      </div>
      <!--底部的编辑人和分享-->
      <div style="position: relative">
        <div class="cl" style="width: 100%;margin: 60px 0 117px 0">
          <div class="fl">
            责任编辑：{{datas.responsibleEditor }}
          </div>
          <div class=" flex-row justify-center deta" style="float: right;">
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
                <img src="../../../src/assets/images/news/weixin.png" alt="" @click="weiChat">
              </div>
            </el-popover>

            <!--<img src="../../../src/assets/images/news/circle.png" alt="">-->
            <img
              @click="qqClick"
              src="../../../src/assets/images/news/qq.png" alt="">
            <img
              @click="weibo"
              src="../../../src/assets/images/news/weibo.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!--广告位-->
    <!--右边布局-->
    <!--广告标签样式没调好，有bug-->
    <div class="rt left-con" v-if="AdData">
      <div class="img1" v-for="(item,index) in AdData"
           @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
           :key="index" :id="item.id" >
        <img :src="item.image"/>
        <!--广告小标题-->
        <div class="mask">广告</div>
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
        data:[
          {id:0,adress:"首页>文章",path:require('../../../src/assets/images/test01.png'),title:"国际货币基金组织：中央银行已被挑战，加密货币或将成为“未来的货币”",article:"财经大咖",time:"06-01  12:38",label:"货币 金融 股票",page_view:"333334",author:"圣诞节凤凰"}
        ],
        AdData:[],
        wei:false,
        shareUrl:{
          qq:"http://connect.qq.com/widget/shareqq/index.html?",
          qqzone:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
          weibo:"http://v.t.sina.com.cn/share/share.php?",
          weixin:""
        }
      }
    },
    methods:{
      getAdData:function () {
        let _this = this
        let params={
          pageCurrent:1,
          pageSize:3
        }
        _this.getData(_this.newInfoAdvertisementUrl,params,function (res) {
          if (res.code === 0) {
            let data = res.object;
            _this.AdData = data
          }
        }, (res) => {
          console.log(res)
        })
      },
      getDetails:function () {
        let _this = this
        let id = _this.id
        _this.GetJson(_this.newsIdUrl,id,function (res) {
          console.log('详情',res.object)
          if (res.code === 0) {
            let data = res.object;
            if(data.releaseDate){
              data.releaseDate=_this.format(data.releaseDate)
            }
            _this.datas = data
          }
        }, (res) => {
          console.log(res)
        })
        setTimeout(function(){
          _this.$emit('is-footer', true)
        },1000);
      },
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
          site:'果味财经',
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
      }
    },
    mounted(){
      this.id=this.$route.query.id
      this.$emit('is-footer', false)
      this.getAdData()
      this.getDetails()
    }
  }
</script>

<style>
  @import "newsDetails.css";
</style>
