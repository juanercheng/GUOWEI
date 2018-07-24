<template>
  <div>
    <div class="news text-left" style="margin-top: 16px" v-if="getHotNews">
      <div class="news-title">热门文章</div>
      <div  v-if="getHotNews.length>0"
            v-for="(item,index) in getHotNews"
            :key="index"
            :id="item.id"
            v-on:click="goDetails(item.id)"
            class="flex-row cl eee">
        <div class="fl hotNews">
          <img class="img"
               :src="item.smallImage "  />
        </div>
        <div class="fl hotNews2">
          <div class="new-title-line2">{{item.title}}</div>
          <div class="author-title-small-express">{{item.releaseDate}}</div>
        </div>
      </div>
      <div v-if="getHotNews.length===0" class="text-center" style="padding-bottom: 30px">
        暂无数据
      </div>
    </div>
    <div class="more change" v-if="getHotNews.length>0" @click="change">换一换</div>
    <div class="right-Ad-box  news-right-Ad relative"
         v-for="(item,index) in rightAd"
         v-if="index<=2"
         @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
         :key="index">
      <img :src='item.image' class="img"/>
      <div class="advertisement-text">广告</div>
    </div>
  </div>
</template>

<script>
import API from  './../../assets/js/api'
export default {
  name: "rightContent",
  data(){
    return{
      fastNewsAdvertisementUrl:API.api.news.fastNewsAdvertisement,
      getHotNewsUrl:API.api.news.getHotNews,
      getHotNews:[],
      rightAd:[],
      pageCurrent:1,
      all:false
    }
  },
  methods:{
    Advertisement:function(){
      let _this = this
      let params={
        pageCurrent:1,
        pageSize:3,
      }
      _this.getData(_this.fastNewsAdvertisementUrl,params,function (res) {
        // console.log(res)
        if (res.code === 0) {
          let data = res.object;
          _this.rightAd = data
        }
      }, (res) => {
        console.log(res)
      })
    },
    getList:function () {
      let _this = this
      let params={
        pageCurrent:_this.pageCurrent,
        pageSize:5,
      }
      _this.getData(_this.getHotNewsUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object;
          for(var i in data){
            if(data[i].releaseDate){
              data[i].releaseDate=_this.format(data[i].releaseDate)
            }
          }
          _this.getHotNews = data
          console.log('getHotNews 333',data)
          if(data.length===0||data.length<3){
            _this.pageCurrent=1
            _this.all=true
          }else {
            _this.all=false
          }

        }
      }, (res) => {
        console.log(res)
      })
    },
    change:function () {
      if(this.all){
        this.getList()
      }else {
        this.pageCurrent++;
        this.getList()
      }
    },
  },
  mounted(){
    this.getList()
    this.Advertisement()
  }
}
</script>

<style scoped>
  .eee{
    padding: 30px 0;border-bottom: 1px solid #ddd;margin:0 26px
  }
  .eee:last-child{
    border-bottom: none;
  }
  .hotNews{
    width: 43.8%;
    height: 69px;
    overflow: hidden;
    margin-right: 19px
  }
  .hotNews2{
    text-align: left;
    width: 64.7%;
    height: 68px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
  }
  .realsdate{
    font-size: 14px;
    color: #999;
  }
  @media screen and (max-width: 1280px) {
    .hotNews,.hotNews2{
      height: 62px;
    }
  }
  @media screen and (max-width: 1204px) {
    .hotNews,.hotNews2{
      height: 46px;
    }
  }
  @media screen and (max-width: 428px) {
    .hotNews, .hotNews2 {
      height: 72px;
    }
  }

</style>
