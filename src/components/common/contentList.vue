<template>
  <div>
    <div class="swiper-container tabs">
      <div class="swiper-wrapper" v-if="tabs">
        <div class="swiper-slide tab-li"
             style="width: 162px!important;"
             v-if="tabs.length!==0"
             v-for="(item,index) in tabs "
             :key="item.remarks"
             v-on:click="tabsClick(index,item.remarks)"
             :class="{active:active === index}">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="tab-con" v-if="data">
      <div class="homtContent-box-1"  v-for="(item,index) in data"
           :id="item.id" :key="index">
        <div
          class="cl homtContent-box"
          :style="index===data.length-1?' border-bottom: none':' border-bottom: 1px solid #ddd;'">
          <div class="home-content-left-box fl">
            <img :src="item.image" class="img" v-on:click="goDetails(item.id)"/>
          </div>
          <div class="home-content-right-box fl">
            <div>
              <div class="cl" style="overflow:hidden;margin-bottom: 21px">
                <img v-show="item.isNew" src="../../../src/assets/images/home/new.png" class="label-icon"/>
                <img v-show="item.isHotspot===1" src="../../../src/assets/images/home/hot.png" class="label-icon"/>
                <div>
                  <a  v-on:click="goDetails(item.id)"
                      style="
                       overflow: hidden;
                       text-overflow:ellipsis;
                       white-space: nowrap;"
                      class="item-title-common">{{item.title}}
                  </a></div>
              </div>
              <div class="item-content"
                   style=" display: -webkit-box;
                 -webkit-box-orient: vertical;
                 -webkit-line-clamp: 2;
                 overflow: hidden;
                 line-height: 21px"
                   v-on:click="goDetails(item.id)">{{item.smallTitle}}</div>
            </div>
            <div class="item-bottom cl">
              <div class="fl">
                <div class="cl">
                  <div class="fl item-bottom-left">{{item.authorName}}</div>
                  <div class="fl item-bottom-left">{{item.releaseDate}}</div>
                  <div class="fl item-bottom-left"
                       v-if="item.tag1||item.tag2||item.tag3">
                    <img class="icon" src="../../../src/assets/images/home/label.png"
                         style="margin-right: 9px"/>
                    <span @click="goLabel(item.tag1)">{{item.tag1}}</span>
                    <span @click="goLabel(item.tag2)">{{item.tag2}}</span>
                    <span @click="goLabel(item.tag3)">{{item.tag3}}</span>
                  </div>
                </div>
              </div>
              <div class="rt">
                <img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes||0}}</div>
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
      pageSize:7,
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
      }else {
        _this.newsTypes = id
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
      // console.log(params)
      _this.postData(_this.newsUrl, params, function (res) {
        if(res.code===0){
          let data = res.object;
          for(var i in data){
            data[i].releaseDate=_this.format(data[i].releaseDate)
            // data[i].mainText=_this.delHtmlTag(data[i].mainText)
          }
          // console.log(data)
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
            }else if(data.length<_this.pageSize){
              _this.more = false
            }else {
              _this.more = true
            }
          }else {
            _this.data=_this.data.concat(dataBlob)
            if(data.length===0||data.length<_this.pageSize){
              _this.moreMsg = '加载完毕'
            }
          }
          data = null;
          dataBlob = null;
        }
        var mySwiper = new Swiper('.swiper-container', {
          autoplay:false,
          loop:false,
          slidesPerView : _this.slidesPerView,
          centeredSlides : false,
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
            let data = res.object;
            _this.tabs = data
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
          // console.log(res)
          if (res.code === 0) {
            _this.tabs=[
              {remarks:'isHotsPot',name:'热点'},
              {remarks:'isAuthor',name:'专栏'}
            ];
            let data = res.object;
            _this.newsType = data.newsType
            if(_this.newsType.length!=0){
              _this.tabs=_this.tabs.concat(_this.newsType)
            }
          }
        }, (res) => {
          console.log(res)
        })
      }
    }
  },
  mounted () {
    if(this.$parent.type==='column'){
      this.isAuthor=2
      this.pageSize=7
    }else if(this.$parent.type==='home'){
      this.isAuthor = this.isAuthor
      this.isHotsPot = 1
      this.pageSize=7
    }else {
      this.isAuthor=''
      this.pageSize=4
    }
    this.DataList();
    this.getTabs();
  }
}
</script>

<style scoped>
  @import "./../home/home.css";
</style>
