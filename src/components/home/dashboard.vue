<template>
  <div class="container">
    <div class="top-advertisement" v-if="topAdvertisement">
      <div class="top-img-box" v-for="(item,index) in topAdvertisement"
           v-if="index<=4"
           @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
           :key="item.id">
        <img :src='item.image' class="img"/>
        <div class="advertisement-text">广告</div>
      </div>
      <div class="cl"></div>
    </div>
    <div class="content-left">
      <v-banner ref="Banner" :homeBanner="homeBanner"></v-banner>
      <div class="center-advertisement" v-if="homeSmaillBanner">
        <div class="center-advertisement-item-box"
             v-for="(i,index) in homeSmaillBanner"
             :id="i.id"
             @click="goNewUrl(i.jumpType,i.jumpUrl,i.jumpNewsId)"
             v-if="index<=2"
             :key="index">
          <img :src="i.image">
          <div class="center-advertisement-item-mask">{{i.title}}</div>
        </div>
      </div>
      <div class="content-home cl">
        <v-home-content ref="HomeContent"></v-home-content>
      </div>
    </div>
    <div class="content-right">
      <v-right-content :busfastnews="busfastnews" :rightAd2="rightAd2" :rightAd3="rightAd3"
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
          _this.topAdvertisement=data.homeHead;
          console.log(data)
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
      let params1={
        token:sessionStorage.getItem('token')
      }
      _this.getData(_this.homeUrl,params1,function (res) {
        if (res.code === 0) {
          let data = res.object;
          let data1 = res.object.fastNews;
          let data2 = res.object.authorList;
          let data3 = res.object.companyList;
          for(var i in data1){
            data1[i].releaseDate=_this.format(data1[i].releaseDate)
          }
          _this.homeBanner=data.homeBanner;
          _this.busfastnews=data1;
          _this.authorList=data2;
          _this.companyList=data3;
          _this.homeSmaillBanner = data.homeSmaillBanner

        }
      }, (res) => {
        console.log(res)
      })
    },
  },
  mounted(){
    this.$emit('is-footer', true)
    this.homeAdvertisement()
  },
}
</script>

<style>
  @import "./home.css";
</style>
