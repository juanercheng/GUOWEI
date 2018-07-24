<template>
  <div>
    <div class="news text-left" v-if="guowerBox">
      <div class="news-title">果味BOX</div>
      <div class="new-item" v-for="(item,index) in guowerBox"
           :id="item.id"
           v-if="index<=0"
           @click="BoxFun(item.jumpType,item.jumpUrl,item.id)"
           :key="item.id">
        <img :src="item.image"
             class="img guowei-img" />
        <div style=" overflow: hidden;
                     text-overflow:ellipsis;
                     white-space: nowrap;"
          class="news-item-title-BOX">{{item.title}}</div>
        <div
          style=" display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;line-height: 20px"
          class="news-item-content">{{item.smallTitle}}</div>
        <div class="cl news-item-bottom"><div class="fl">{{item.releaseDate}}</div>
          <div class="rt">
            <img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes||0}}
          </div>
        </div>
      </div>
    </div>
    <div v-if="$parent.type==='column'">
      <div class="news text-left author" style="margin-top: 30px;margin-bottom: 30px;" v-if="authorList">
        <div class="news-title">作者排行</div>
        <div class="author-item cl" v-for="(item,index) in authorList"
             :key="item.id"
             v-if="index<=2"  v-on:click="columnSpecial(item.userId)">
          <div class="fl author-sort" >{{index+1}}</div>
          <div class="new-item-author fl"><img :src="item.headImg"/></div>
          <div class="fl" style="width: 100%">
            <div class="flex-row" style="align-items: center;width: 100%">
              <div class="author-title-1 text-left" style="max-width: 50%;">{{item.nickName}}</div>
              <div v-if="item.userLevel===1"><span class="userLevel">认证企业</span></div>
              <div v-if="item.userLevel===2"><span class="userLevel">认证作者</span></div>
              <div v-if="item.userLevel===3"><span class="userLevel">认证媒体</span></div>
            </div>
            <div class="author-title-small">
              <img src="../../../src/assets/images/home/eye.png"/> {{item.totalBrowse||0}}</div>
          </div>
        </div>
      </div>
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
            <div class="realsdate">{{item.releaseDate}}</div>
          </div>
        </div>
        <div v-if="getHotNews.length===0" class="text-center" style="padding-bottom: 30px">
          暂无数据
        </div>
      </div>
    </div>
    <div v-if="$parent.type==='column' && getHotNews.length>0"
         @click="change"
         class="more change" style="margin: 10px 0">换一换</div>
    <div class="news-right-Ad-last relative" v-if="rightVideo.length!==0">
      <video v-if="videoType===1" class="img"  id="video" :src="rightVideo.jumpUrl">
        <source :src="rightVideo.jumpUrl" type="video/mp4">
      </video>
      <iframe v-else class="img"
              :src="rightVideo.jumpUrl"  ></iframe>
      <div class="video-title cl"  >
        <div class="fl" style="margin-left: 11px">{{rightVideo.title}}</div>
        <img class="rt" @click="play" v-if="!isPlay&&videoType===1"
             src="../../../src/assets/images/bo.png"
             style="width: 24px;height: 24px ;margin-right: 14px">
        <img class="rt" @click="pausePlay" v-else  v-if="videoType===1"
             src="../../../src/assets/images/stop.png"
             style="width: 24px;height: 24px ;margin-right: 14px">
      </div>
    </div>
    <div class="right-Ad-box  news-right-Ad relative"
         :id="item.id" v-for="(item,index) in rightButton"
         @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
         v-if="rightButton||index<=2" >
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
      AdvertisementUrl:API.api.news.newsAdvertisement, //首页广告接口
      newsColumnAdvertisementUrl:API.api.express.newsColumnAdvertisement,
      getAuthorColUrl:API.api.express.getAuthorCol, //首页广告接口
      getHotNewsUrl:API.api.news.getHotNews,//热门文章
      updateLookTimesUrl:API.api.express.updateLookTimes,//热门文章
      rightVideo:{},
      videoType:null,
      rightButton:[],
      guowerBox:[],
      authorList:[],
      getHotNews:[],
      pageCurrent:1,
      all:false,
      isPlay:false
    }
  },
  methods:{
    Advertisement:function(){
      let _this = this
      let params={
        token:sessionStorage.getItem('token')
      }
      _this.getData(_this.AdvertisementUrl,params,function (res) {
        if (res.code === 0) {
          let data = res.object;
          let rightVideo = data.rightVideo;
          _this.rightButton = data.rightButton;
          for (var i in data.guowerBox){
            data.guowerBox[i].releaseDate=_this.format(data.guowerBox[i].releaseDate)  //修改时间格式
          }
          _this.guowerBox = data.guowerBox;
          for (var i in rightVideo){
            _this.rightVideo=rightVideo[0]
          }
          if(_this.rightVideo.jumpUrl){
            if(_this.rightVideo.jumpUrl.indexOf('html')!=-1){
              _this.videoType=0
            }else {
              _this.videoType=1
            }
          }
        }
      }, (res) => {
        console.log(res)
      })

      //作者排行
      let params1={
        pageCurrent:1,
        pageSize:3
      }
      _this.getData(_this.getAuthorColUrl,params1,function (res) {
        if (res.code === 0) {
          let data2 = res.object;
          _this.authorList=data2;


          // switch ( _this.authorList.userLevel) {
          //   case 1:
          //     _this.authorList.userLevel = '认证企业'
          //     break
          //   case 2:
          //     _this.authorList.userLevel = '认证作者'
          //     break
          //   case 3:
          //     _this.authorList.userLevel = '认证媒体'
          //     break
          // }
          // debugger
        }
      }, (res) => {
        console.log(res)
      })
    },
    getList:function(){
      let _this = this
      //热门文章
      let params2={
        pageCurrent:_this.pageCurrent,
        pageSize:5,
      }
      _this.getData(_this.getHotNewsUrl,params2,function (res) {
        // console.log(res)
        if (res.code === 0) {
          let data = res.object;
          for(var i in data){
            if(data[i].releaseDate){
              data[i].releaseDate=_this.format(data[i].releaseDate)
            }
          }

          _this.getHotNews = data

          if(data.length===0||data.length<5){
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
    play:function () {
      this.isPlay=true
      document.getElementById('video').play()
    },
    pausePlay:function () {
      this.isPlay=false
      document.getElementById('video').pause();
    },
    BoxFun:function (jumpType,jumpUrl,id) {
      let _this = this
      let params = {
        id:id
      }
      let newTab=window.open(jumpUrl);
      _this.getData(_this.updateLookTimesUrl,params,function (res) {
        if (res.code === 0) {
          if(jumpType===1){
            newTab.location.href=jumpUrl;
          }else if(jumpType===2){

          }else if(jumpType===3){

          }else {
            _this.$router.push({
              path: './newsDetails',
              query:{id:id}
            })
          }
        }
      })

    }
  },
  mounted(){
    if(this.$parent.type==='column'){
      this.AdvertisementUrl=API.api.express.newsColumnAdvertisement
    }else {
      this.AdvertisementUrl=API.api.news.newsAdvertisement
    }
    this.Advertisement()
    this.getList()
  },
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
    height: 69px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
    color: #333;
    cursor: pointer;
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

</style>
