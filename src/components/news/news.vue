<template>
<div class="container cl" style="overflow: hidden;margin-top: 21px">
  <div class="content-left">
    <v-banner ref="Banner"
              :otherBanner="otherBanner"
              style="margin-bottom: 30px"></v-banner>
    <div class="content-home cl">
      <v-news-content ref="newsContent"></v-news-content>
    </div>
  </div>
  <div class="content-right">
    <v-right-content ref="RightContent"></v-right-content>
  </div>
</div>
</template>

<script>
import newsContent from './../common/contentList'
import RightContent from './../common/rightContent'
import Banner from  './../common/banner'
import API from '../../assets/js/api'
export default {
  name: "news",
  data(){
    return{
      type:'news',  //新闻
      active:0,
      tabs:[],
      Url: API.api.news.getNewsBanner,
      otherBanner:[]
    }
  },
  components: {
    'v-news-content': newsContent,
    'v-right-content': RightContent,
    'v-banner': Banner
  },
  methods:{
    getTabs:function () {
      let _this = this;
      let params={
        pageCurrent:1,
        pageSize:30,
      };
      _this.getData(_this.Url,params,function (res) {
        if (res.code === 0) {
          let data = res.object;
          _this.otherBanner = data
          _this.$emit('is-footer', true)
        }
      }, (res) => {
        console.log(res)
      })
      setTimeout(function(){
        _this.$emit('is-footer', true)
      },1000);
    }
  },
  mounted(){
    this.$emit('is-footer', false)
    this.getTabs()
  },
}
</script>

<style>
  @import "./../home/home.css";
  @import "./news.css";
</style>
