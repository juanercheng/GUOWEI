<template>
  <div v-if="busfastnews" >
    <div class="scroll-div">
      <div class="news text-left ">
        <div class="news-title">7×24小时快讯</div>
        <div style="overflow-y: auto;height: 567px"
             class="news-target"
             v-on:scroll="newsScroll()">
          <div class="new-item"
               v-for="(item,index) in busfastnews"
               v-if="index<=9"
               @click="getType(index)"
               :class="index===4?'news3':null"
               :key="index">
            <div style="line-height: 21px;" class="news-item-title">{{item.title}}
            </div>
            <div class="news-item-content">{{item.mainText}}</div>
            <div class="cl news-item-bottom">
              <div class="fl">{{item.releaseDate}}</div>
              <!--<div class="rt"><img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes||0}}</div>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-div_outer" style="height: 567px">
      <div class="scroll-div_inside"></div>
    </div>
    <div class="right-Ad-box relative home-news"  :class="!rightAd1?'border-line':null">
      <img :src='rightAd1.image'  v-if="rightAd1"
           @click="goNewUrl(rightAd1.jumpType,rightAd1.jumpUrl,rightAd1.jumpNewsId)"
           class="img" />
      <div class="advertisement-text">推广</div>
    </div>
    <div class="news text-left " v-if="authorList">
      <div class="news-title">专栏作者</div>
      <div class="author-item cl"
           v-for="(item,index) in authorList"
           :key="index"
           v-if="index<=3"
           :id="item.id"
           v-on:click="columnSpecial(item.userId)">
        <div class="new-item-author fl">
          <img :src="item.headImg"/>
        </div>
        <div class="fl">
          <div class="author-title">
            {{item.nickName}}</div>
          <div class="author-title-small">{{item.signature}}</div>
        </div>
      </div>
    </div>
    <div class="right-Ad-box relative home-news" :class="!rightAd2?'border-line':null" >
      <img :src='rightAd2.image' v-if="rightAd2"
           @click="goNewUrl(rightAd2.jumpType,rightAd2.jumpUrl,rightAd2.jumpNewsId)"
           class="img"/>
      <div class="advertisement-text">推广</div>
    </div>
    <div class="news text-left " v-if="companyList">
      <div class="news-title">企业专栏</div>
      <div class="author-item cl" v-for="(item,index) in companyList"
           :key="index"
           v-if="index<=2"
           v-on:click="columnSpecial(item.userId)"
           :id="item.id">
        <div class="new-item-bussiness fl"><img :src="item.headImg"/></div>
        <div class="fl" style="width: 100%">
          <div class="author-title" >{{item.nickName}}</div>
          <div class="author-title-small">{{item.signature}}</div>
        </div>
      </div>
    </div>
    <div class="right-Ad-last relative"  :class="!rightAd3?'border-line':null" >
      <img :src='rightAd3.image' v-if="rightAd3"
           @click="goNewUrl(rightAd3.jumpType,rightAd3.jumpUrl,rightAd3.jumpNewsId)"
           class="img"/>
      <div class="advertisement-text">推广</div>
    </div>
  </div>
</template>

<script>
  import API from  './../../assets/js/api'
  export default {
    name: "rightContent",
    props:['companyList','authorList','rightAd1','rightAd2','rightAd3'],
    data(){
      return{
        maxHeight:567,
        homeUrl:API.api.home.homeUrl, //首页广告接口
        busfastnews:[],
        yes:false,
        scrollStatus:true,
        fireFoxJudge:false,
      }
    },
    methods:{
      newsScroll:function(e){
        let _this=this;
        if(!_this.fireFoxJudge){
          if(_this.scrollStatus){
            let theEvent= e || window.event;
            let target = theEvent.target || theEvent.srcElement;
            let newsScrollHeight=target.scrollTop;
            let thisHeiht=target.offsetHeight;
            var newsContent=document.getElementsByClassName('news-target')[0];
            var newsChildHeight=newsContent.scrollHeight;
            let scrollDivOuterHeight=document.getElementsByClassName('scroll-div_outer')[0].offsetHeight;
            let scrollDivInside=document.getElementsByClassName('scroll-div_inside')[0];
            let topVal=newsScrollHeight*(scrollDivOuterHeight/(newsChildHeight-thisHeiht));
            if(topVal>=scrollDivInside.offsetHeight){
              scrollDivInside.style.top=topVal-scrollDivInside.offsetHeight+'px';
            }else{
              scrollDivInside.style.top=0;
            }
          }
        }else{
          return true;
        }
      },
      columnSpecial:function (id) {
        this.$router.push({
          path: './columnSpecial',
          query:{id:id}
        })
      },
      fetData:function(){
        let params1={}
        let _this = this
        _this.getData(_this.homeUrl,params1,function (res) {
          if (res.code === 0) {
            let data1 = res.object.fastNews;
            for(var i in data1){
              data1[i].releaseDate=_this.format(data1[i].releaseDate)
            }
            _this.busfastnews=data1;
            if(_this.busfastnews.length>=4){
              _this.$nextTick(function () {
                var newsTitleHeight=document.getElementsByClassName('news-title')[0].offsetHeight;
                var drag=document.getElementsByClassName('scroll-div_inside')[0];
                var dragParent=document.getElementsByClassName('scroll-div_outer')[0];
                var newsContent=document.getElementsByClassName('news-target')[0];
                var newsHeight=_this.maxHeight;
                var newsChildHeight=newsContent.scrollHeight;
                if(newsChildHeight<=newsHeight)dragParent.style.display="none";
                dragParent.style.height=newsHeight+10+'px';
                dragParent.style.top=newsTitleHeight+120+'px';
                drag.style.height=newsHeight/10+'px';
                drag.onmousedown=function(e) {
                  if (!_this.fireFoxJudge) {
                    _this.scrollStatus = false;
                    if (!_this.scrollStatus) {
                      var theEvent = e || window.event;
                      var diffY = theEvent.clientY - drag.offsetTop;
                      let newsChildHeight = newsContent.scrollHeight;
                      console.log(newsChildHeight);
                      // if (typeof drag.setCapture != 'undefined') {
                      //   drag.setCapture();
                      // }
                      document.onmousemove = function (e) {
                        if(!_this.fireFoxJudge) {
                          var theEvent = e || window.event;
                          var top = theEvent.clientY - diffY;
                          let scrollDivOuterHeight = dragParent.offsetHeight;
                          let scrollDivHeight = drag.offsetHeight;
                          if (top <= 0) top = 0;
                          else if (top >= scrollDivOuterHeight - scrollDivHeight && top >= scrollDivHeight) top = scrollDivOuterHeight - scrollDivHeight;
                          drag.style.top = top + 'px';
                          if(!!window.ActiveXObject || "ActiveXObject" in window){
                            newsContent.scrollTop=top * ((newsChildHeight - scrollDivOuterHeight + scrollDivHeight * 1.5) / scrollDivOuterHeight);
                          }else{
                            newsContent.scrollTo(0, top * ((newsChildHeight - scrollDivOuterHeight + scrollDivHeight * 1.5) / scrollDivOuterHeight));
                          }
                        }else{
                          return true;
                        }
                      }
                      document.onmouseup = function (e) { //当鼠标弹起来的时候不再移动
                        this.onmousemove = null;
                        this.onmouseup = null; //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                        _this.scrollStatus = true;
                        // //修复低版本ie bug
                        // if (typeof drag.releaseCapture != 'undefined') {
                        //   drag.releaseCapture();
                        // }
                      };
                    }
                  }else{
                    return true;
                  }
                }
              })
            }

          }
        }, (res) => {
          console.log(res)
        })
      },
      getType:function (e) {
        console.log(e)
      }
    },
    mounted(){
      var _this=this;
      let firefox=navigator.userAgent.indexOf("Firefox")>0||navigator.userAgent.indexOf("Edge")>0?true:false;
      if(firefox){
        let scrollOuter=document.getElementsByClassName('scroll-div_outer')[0];
        scrollOuter.style.display="none";
        _this.fireFoxJudge=true;
      }
      _this.fetData();
    },
  }
</script>
<style scoped>
  .news-target::-webkit-scrollbar{/*滚动条整体部分，其中的属性有width,height,background,border等（就和一个块级元素一样）（位置1）*/
    width:10px;
    height:10px;
  }
  .news-target::-webkit-scrollbar-button{/*滚动条两端的按钮，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置2）*/
    display:none
  }
  .news-target::-webkit-scrollbar-track{/*外层轨道，可以用display:none让其不显示，也可以添加背景图片，颜色改变显示效果（位置3）*/
    display:none
  }
  .news-target::-webkit-scrollbar-track-piece{/*内层轨道，滚动条中间部分（位置4）*/
    display:none
  }
  .news-target::-webkit-scrollbar-thumb{/*滚动条里面可以拖动的那部分（位置5）*/
    display:none
  }

  .scroll-div{
    position:relative;
    -ms-scrollbar-arrow-color: #fafbfc;
    scrollbar-arrow-color: #fafbfc;
    -ms-scrollbar-face-color: #fafbfc;
    scrollbar-face-color: #fafbfc;
    scrollbar-3dlight-color:#fafbfc;
    -ms-scrollbar-3dlight-color:#fafbfc;
    -ms-scrollbar-highlight-color: #fafbfc;
    scrollbar-highlight-color: #fafbfc;
    -ms-scrollbar-shadow-color: #fafbfc;
    scrollbar-shadow-color: #fafbfc;
    -ms-scrollbar-darkshadow-color: #fafbfc;
    scrollbar-darkshadow-color: #fafbfc;
    -ms-scrollbar-track-color: #fafbfc;
    scrollbar-track-color: #fafbfc;
    -ms-scrollbar-base-color: #fafbfc;
    scrollbar-base-color: #fafbfc;
  }
  .scroll-div_outer{
    background:#fafafa;
    width:5px;
    height:100%;
    /*max-height: 1350px;*/
    position:absolute;
    top:143px;
    right:0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .scroll-div_inside{
    position:absolute;
    background:#959595;
    /*height:110px;*/
    z-index:1000;
    top:0;
    left:0;
    width:100%;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  .scroll-div_inside:hover{cursor:pointer;}
</style>

