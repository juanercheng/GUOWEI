<template>
  <div class="container">
    <div class="top-advertisement">
      <div class="top-img-box"
           v-for="(item,index) in topAdvertisement"
           :key="index"
           v-if="index<=4"
           :class="!item?'border-line-1':null">
        <img :src='item.image'
             v-if="item"
             @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
             class="img"/>
        <div class="advertisement-text" >推广</div>
      </div>
      <div class="cl"></div>
    </div>
    <div class="content-left">
      <v-banner ref="Banner" :homeBanner="homeBanner"></v-banner>
      <div class="center-advertisement" v-if="homeSmaillBanner">
        <div class="center-advertisement-item-box"
             v-for="(i,index) in homeSmaillBanner"
             :class="!i?'border-line':null"
             v-if="index<=2"
             :key="index">
          <img :src="i.image" @click="goNewUrl(i.jumpType,i.jumpUrl,i.jumpNewsId)"
               class="img"/>
          <div class="center-advertisement-item-mask">{{i.title}}</div>
        </div>
      </div>
      <div class="content-home cl">
        <v-home-content ref="HomeContent"></v-home-content>
      </div>
    </div>
    <div class="content-right">
      <v-right-content :rightAd2="rightAd2" :rightAd3="rightAd3"
                       :companyList="companyList" :rightAd1="rightAd1"
                       :authorList="authorList"></v-right-content>
    </div>
    <div class="cl"></div>
  </div>
</template>

<script>
import HomeContent from './../common/contentList'
import RightContent from './rightContent';
import Banner from  './../common/banner'
import API from  './../../assets/js/api'
export default {
  name: 'dashboard',
  data () {
    return {
      type:'home',  //首页
      homeAdvertisementUrl:API.api.home.homeAdvertisement, //首页广告接口
      homeUrl:API.api.home.homeUrl, //首页广告接口
      topAdvertisement:[],
      homeBanner:[],
      busfastnews:[],
      homeSmaillBanner:[],
      companyList:[],
      authorList:[],
      rightAd1:{},
      rightAd2:{},
      rightAd3:{},
      newsType:[]
    }
  },

  components: {
    'v-home-content': HomeContent,
    'v-right-content': RightContent,
    'v-banner': Banner,
  },
  methods:{

    homeAdvertisement:function(){
      let _this = this
      let params={
        // token:sessionStorage.getItem('token')
      }
      _this.getData(_this.homeAdvertisementUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object;
          let len,arr=[]
          if(data.homeHead.length<5){
            len = 4 - data.homeHead.length
            for (var i=0;i<=len;i++){
              arr.push({
                image:null,
              })
              _this.topAdvertisement=data.homeHead.concat(arr)
            }
          }else {
            _this.topAdvertisement=data.homeHead;
          }
          for (var i in data.homeRight){
            _this.rightAd1=data.homeRight[0]
            _this.rightAd2=data.homeRight[1]
            _this.rightAd3=data.homeRight[2]
          }
        }
      }, (res) => {
        console.log(res)
      })

      //home APi
      let params1={}
      _this.getData(_this.homeUrl,params1,function (res) {
        if (res.code === 0) {
          let data = res.object;
          let data1 = res.object.fastNews;
          let data2 = res.object.authorList;
          let data3 = res.object.companyList;
          // console.log(data2);
          for(var i in data1){
            data1[i].releaseDate=_this.format(data1[i].releaseDate)
          }
          _this.homeBanner=data.homeBanner;
          _this.busfastnews=data1;
          _this.authorList=data2;
          _this.companyList=data3;

          let len,arr=[]
          if(data.homeSmaillBanner.length<3){
            len =2 - data.homeSmaillBanner.length
            for (var i=0;i<=len;i++){
              arr.push({
                image:null,
              })
              _this.homeSmaillBanner=data.homeSmaillBanner.concat(arr)
            }
          }else {
            _this.homeSmaillBanner=data.homeSmaillBanner;
          }
        }
      }, (res) => {
        console.log(res)
      })
      setTimeout(function(){
        _this.$emit('is-footer', true)
      },1000);
    },
  },
  mounted(){
    this.$emit('is-footer', false)
    this.homeAdvertisement()
  },

}
</script>

<style>
  @import "./home.css";
</style>
