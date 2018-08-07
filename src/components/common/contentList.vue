<template>
  <div>
    <div class="" style="display: flex;flex-direction: row;justify-content: space-between;align-items: center;background-color: rgb(250,251,252)">
      <div class="swiper-container tabs">
        <div class="swiper-wrapper" v-if="tabs" style="transition-duration: 0ms; transform: translate3d(0px, 0px, 0px);">
          <div class="swiper-slide tab-li"
               v-if="tabs.length!==0"
               v-for="(item,index) in tabs "
               :key="index"
               v-on:click="tabsClick(index,item.remarks)"
               :class="{active:active === index}">
            <span>{{item.name}}</span>
          </div>
        </div>
        <!--<div class="swiper-button-prev"></div>-->
      </div>
      <div class="next-btn"><img src="../../../src/assets/images/next(1).png" alt=""></div>
    </div>
    <div class="tab-con" v-if="data">
      <div class="homtContent-box-1"  v-for="(item,index) in data"
           :id="item.id" :key="index">
        <div
          class="cl homtContent-box"
          :style="index===data.length-1?' border-bottom: none':' border-bottom: 1px solid #f6f6f6;'">
          <div class="home-content-left-box fl">
            <img :src="item.smallImage" class="img" v-on:click="goDetails(item.id,$parent.type)"/>
          </div>
          <div class="home-content-right-box fl">
            <div>
              <div class="cl moble">
                <img v-show="item.tag===2" src="../../../src/assets/images/home/new.png" class="label-icon"/>
                <img v-show="item.tag===1" src="../../../src/assets/images/home/hot-.png" class="label-icon"/>
                <div>
                  <a  v-on:click="goDetails(item.id,$parent.type)"
                      style="
                       overflow: hidden;
                       text-overflow:ellipsis;
                       white-space: nowrap;"
                      class="item-title-common" target="_blank">{{item.title}}
                  </a></div>
              </div>
              <div class="item-content"
                   style=" display: -webkit-box;
                 -webkit-box-orient: vertical;
                 -webkit-line-clamp: 2;
                 overflow: hidden;
                 line-height: 21px"
                   v-on:click="goDetails(item.id,$parent.type)">{{item.smallTitle}}</div>
            </div>
            <div class="item-bottom cl">
              <div class="fl">
                <div class="cl">
                  <div class="fl item-bottom-left" style="cursor: pointer; overflow: hidden;width: 94px;
    white-space: nowrap;
    text-overflow: ellipsis;"
                       v-on:click="columnSpecial(item.author)">{{item.authorName}}</div>
                  <div class="fl item-bottom-left">{{item.releaseDate}}</div>
                  <div class="fl item-bottom-left"
                       v-if="item.tag1||item.tag2||item.tag3">
                    <img class="icon" src="../../../src/assets/images/home/label（1）.png"
                         style="margin-right: 9px"/>
                    <span @click="goLabel(item.tag1)" v-if="item.tag1 ">{{item.tag1}}</span>
                    <span @click="goLabel(item.tag2)" v-if="item.tag2">{{item.tag2}}</span>
                    <span @click="goLabel(item.tag3)" v-if="item.tag3 ">{{item.tag3}}</span>
                  </div>
                </div>
              </div>
              <div class="rt">
                <img src="../../../src/assets/images/home/eye（1）.png" class="icon"/>{{item.lookTimes||0}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="more" class="more" @click="getMore">{{moreMsg}}</div>
  </div>
</template>

<script>
import API from '../../assets/js/api'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
  name: "ContentList",
  data(){
    return{
      newsUrl:  API.api.news.list,
      homeUrl:API.api.home.homeUrl, //首页广告接口
      cfgUrl:API.api.cfg.dictInfo,
      tabs:[],
      active:0,
      slidesPerView:5,
      listData:[],
      isAuthor:'',
      newsTypes:'',
      isHotsPot:0,
      pageCurrent:1,
      pageSize:21,
      more:true,
      moreMsg:'正在加载...',
      data:[],
    }
  },
  methods:{
    tabsClick:function (index,id) {
      let _this = this;
      _this.active = index;
      _this.moreMsg = '正在加载...';
      _this.pageCurrent=1;
      _this.data=[];
      if(this.$parent.type==='home'){
        if(id==='isHotsPot'){
          _this.isHotsPot = 1
          _this.isAuthor = ''
          _this.newsTypes = ''
        }else if(id==='isAuthor'){
          _this.isHotsPot = 0
          _this.isAuthor = 2
          _this.newsTypes = ''
        }else {
          _this.isHotsPot = 0
          _this.isAuthor = ''
          _this.newsTypes = id
        }
      }else if(this.$parent.type==='news') {
        _this.newsTypes = id
        _this.isAuthor = 1
      }else {
        _this.newsTypes = id
        _this.isAuthor = 2
      }
      this.DataList();
    },
    DataList:function (type,param) {
      let _this = this
      let params={
        isHotsPot:_this.isHotsPot,
        isAuthor:_this.isAuthor,
        isAdvertisementL:0,
        isAdvertisement:0,
        newsType:_this.newsTypes,
        author:'',
        pageCurrent:_this.pageCurrent,
        pageSize:_this.pageSize,
      };
      console.log(params)
      _this.postData(_this.newsUrl, params, function (res) {
        console.log(res,9090)

        if(res.code===0){
          let data = res.object;
          for(var i in data){
            data[i].releaseDate=_this.format(data[i].releaseDate)
            // data[i].mainText=_this.delHtmlTag(data[i].mainText)
          }
          let dataBlob = [];
          if(data.length>0){
            data.map(function (item) {
              dataBlob.push(item)
            });
          }
          _this.moreMsg = '加载更多';
          if(_this.pageCurrent===1){
            _this.data=dataBlob;
            if(data.length===0){
              _this.moreMsg = '暂无数据'
              _this.more = true
            }else if(data.length<_this.pageSize){
              _this.more = false
            }else {
              _this.more = true
            }
          }else {
            _this.data=_this.data.concat(dataBlob)
            if(data.length===0||data.length<_this.pageSize){
              _this.moreMsg = '加载完毕'
              _this.more = true
            }
          }
          data = null;
          dataBlob = null;
        }
        var mySwiper = new Swiper('.swiper-container', {
          autoplay:false,
          loop:false,
          centeredSlides : false,
          prevButton: '.swiper-button-prev',
          slidesPerView:_this.slidesPerView,
          // nextButton: '.swiper-button-next',
        })
      })
    },
    getMore:function () {
      let _this = this;
      _this.moreMsg = '正在加载...';
      _this.pageCurrent ++;
      this.DataList()
    },
    getTabs:function () {
      if(this.$parent.type!='home'){
        let _this = this;
        let params={
          code:'TYPE_NEWS'
        };
        _this.getData(_this.cfgUrl,params,function (res) {
          if (res.code === 0) {
            let arr=[
              { remarks:'',
                name:'最新',
                code: "TYPE_NEWS",
                createTime: " ",
                createUser: "",
                id: 1,
                isHomePage: 1,
                remarks1: null,
                sort: 0,
                status: null,
                type: "TYPE_NEWS"
              }
            ];
            let data = res.object;
            _this.tabs = data;
            // if(_this.newsType.length!==0){
            _this.tabs.unshift(arr[0]);
            arr=_this.tabs;
              console.log(arr)
            // }
            _this.tabs=arr

          }
        }, (res) => {
          console.log(res)
        })
      }else {
        let _this = this
        let params1={
          token:sessionStorage.getItem('token')
        }
        _this.getData(_this.homeUrl,params1,function (res) {
          if (res.code === 0) {
            _this.tabs=[
              { remarks:'isHotsPot',
                name:'热点',
                code: "TYPE_NEWS",
                createTime: " ",
                createUser: "1",
                id: 1,
                isHomePage: 1,
                remarks1: null,
                sort: 0,
                status: null,
                type: "TYPE_NEWS"
              },
              { remarks:'isAuthor',
                name:'专栏',
                code: "TYPE_NEWS",
                createTime: " ",
                createUser: "1",
                id: 2,
                isHomePage: 1,
                remarks1: null,
                sort: 1,
                status: null,
                type: "TYPE_NEWS"
              }
            ];
            let data = res.object;
            // console.log(data)
            let arr = []
            _this.newsType = data.newsType
            if(_this.newsType.length!==0){
              arr=_this.tabs.concat(_this.newsType)
              // console.log(arr)
            }
            _this.tabs=arr

          }
        }, (res) => {
          console.log(res)
        })
      }
    },
  },
  mounted () {
    if(this.$parent.type==='column'){
      this.isAuthor=2
      this.pageSize=21
    }else if(this.$parent.type==='home'){
      this.isAuthor = this.isAuthor
      this.isHotsPot = 1;
      this.pageSize=21
    }else {
      this.isAuthor=1;
      this.pageSize=21
    }
    this.DataList();
    this.getTabs();
  }
}
</script>

<style scoped>
  @import "./../home/home.css";
</style>
