<template>
<div>
  <div class="top">
    <div class="container">
      <div v-if="authorData" style="  color: #2f2f2f;">
        <img :src="authorData.headImg?authorData.headImg:''" class="user-img-s">
        <div class="user-name-a cl flex-row justify-center">
          <div class="fl">{{authorData.nickName}}</div>
          <div  class="isAuthentication fl">{{isAuthenticationType}}</div>
        </div>
        <div class="user-info">{{authorData.signature}}</div>
        <div class="cl user-num">
          <ul class="fl">
            <li class="fristLi">文章</li>
            <li class="font24">{{authorData.newsTotal||0}}</li>
          </ul>
          <ul class="rt">
            <li class="fristLi">浏览量总数</li>
            <li class="font24">{{authorData.browseTotal||0}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="special-list" v-if="dataList"
         :style="dataList.length===0?'min-height:90px':null">
      <div class="special-item cl"
           v-for="(item,index) in dataList"
           :key="index">
        <div class="home-content-left-box special-img fl">
          <img :src="item.smallImage" class="img" v-on:click="goDetails(item.id)"/>
        </div>
        <div class="home-content-right-box special-right-box fl">
          <div>
            <div class="cl" style="overflow:hidden;margin-bottom: 21px">
              <div>
                <a  v-on:click="goDetails(item.id)"
                    style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;font-weight: bold"
                    class="item-title-common">{{item.title}}</a>
              </div>
            </div>
            <div class="item-content"
                 style=" display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;line-height: 20px"
                 v-on:click="goDetails(item.id)">{{item.smallTitle}}</div>
          </div>
          <div class="item-bottom cl">
            <div class="fl">
              <div class="cl">
                <div class="fl item-bottom-left" style="width: 94px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{item.authorName}}</div>
                <div class="fl item-bottom-left">{{item.releaseDate}}</div>
                <div class="fl item-bottom-left"
                     v-if="item.tag1||item.tag2||item.tag3">
                  <img class="icon" src="../../../src/assets/images/home/label.png"/>
                  <span @click="goLabel(item.tag1)" v-if="item.tag1">{{item.tag1}}</span>
                  <span @click="goLabel(item.tag2)" v-if="item.tag2">{{item.tag2}}</span>
                  <span @click="goLabel(item.tag3)" v-if="item.tag3">{{item.tag3}}</span>
                </div>
              </div>
            </div>
            <div class="rt"><img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes}}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="more" class="more" @click="getMore" style="margin:1.6%  0 3.3% 0;">{{moreMsg}}</div>
  </div>
</div>
</template>
<script>
import API from  './../../assets/js/api'
export default {
  name: "columnSpecial",
  data(){
    return{
      authorUrl: API.api.express.author,
      newsUrl:  API.api.news.list,
      id:null,
      authorData:null,
      isAuthenticationType:null,
      pageCurrent:1,
      more:true,
      moreMsg:'正在加载...',
      dataList:[],
    }
  },
  components: {
  },
  methods:{
    getDetails:function () {
      let _this = this
      let id = _this.id
      _this.GetJson(_this.authorUrl,id,function (res) {
        if (res.code === 0) {
          let data = res.object;
          _this.authorData = data
          if(_this.authorData.userLevel===2){
            _this.isAuthenticationType = '认证作者'
          }else if(_this.authorData.userLevel===1){
            _this.isAuthenticationType = '认证企业'
          }else {
            _this.isAuthenticationType = '认证媒体'
          }
        }
      }, (res) => {
        console.log(res)
      })
    },
    DataList:function () {
      let _this = this
      let params={
        isHotsPot:'',
        isAuthor:'',
        isAdvertisementL:'',
        isAdvertisement:'',
        newsType:'',
        author:_this.id,
        pageCurrent:_this.pageCurrent,
        pageSize:5,
      };
      // console.log(params)
      _this.postData(_this.newsUrl, params, function (res) {
        if(res.code===0){
          let data = res.object;

          for(var i in data){
            data[i].releaseDate=_this.format(data[i].releaseDate)
          }
          let dataBlob = [];
          if(data.length>0){
            data.map(function (item) {
              dataBlob.push(item)
            });
          }
          console.log(dataBlob);
          _this.moreMsg = '加载更多';
          if(_this.pageCurrent===1){
            _this.dataList=dataBlob;
            if(data.length===0){
              _this.moreMsg = '暂无数据'
            }
          }else {
            _this.dataList=_this.dataList.concat(dataBlob)
            if(data.length===0||data.length<5){
              _this.moreMsg = '加载完毕'
            }
          }
          data = null;
          dataBlob = null;
        }
      })
    },
    getMore:function () {
      let _this = this;
      _this.moreMsg = '正在加载...';
      _this.pageCurrent ++;
      this.DataList()
    },
  },
  mounted(){
    this.id = this.$route.query.id
    this.getDetails()
    this.DataList()
  },
}
</script>

<style>
  @import "./../home/home.css";
  @import "./column.css";
</style>
