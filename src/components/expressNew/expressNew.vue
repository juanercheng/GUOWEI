<template>
  <div class="container cl container-fluid" style="overflow: hidden">
    <div class="content-left ">
      <div class="content-home cl">
        <ul class="tabs express-tabs" v-if="tabs">
          <li class="tab-li express-tabs-li"
              v-for="item in tabs "
              :key="item.id"
              v-on:click="tabsClick(item.id)"
              :class="{active:active === item.id}">
            <span >{{item.text}}</span>
          </li>
        </ul>
        <div class="tab-con text-left">
          <div v-if="type===1">
            <div class="con-item"
                 v-for="(item,index) in data"
                 :id="item.id"
                 :key="index">
              <div class="con-item-title">{{item.title}}</div>
              <div class="con-item-con">{{item.mainText}}</div>

              <div class="item-bottom cl">
                <div class="fl">
                  <div class="cl">
                    <!--<div class="fl item-bottom-left">{{item.releaseUserName}}</div>-->
                    <div class="fl item-bottom-left">{{item.releaseDate}}</div>
                    <!--<div class="fl item-bottom-left">-->
                      <!--<img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes||0}}</div>-->
                  </div>
                </div>
                <div class="rt share">
                  <el-popover
                    placement="right"
                    width="100"
                    trigger="click">
                    <div class="text-left">
                      <div>分享到：</div>
                      <ul id="share">
                        <li  class="flex-row" @click="weiChat">
                          <img src="../../../src/assets/images/news/微信.svg" alt=""
                          >
                          <div>微信</div>
                        </li>
                        <li class="flex-row" @click="qqClick(item)">
                          <img  src="../../../src/assets/images/news/qq.svg" alt="">
                          <div>QQ</div>
                        </li>
                        <li class="flex-row " @click="weibo(item)">
                          <img  src="../../../src/assets/images/news/微博.svg" alt="">
                          <div>微博</div>
                        </li>
                      </ul>
                    </div>
                    <div slot="reference">
                      <img src="../../../src/assets/images/share.png" class="icon"/>分享
                    </div>
                  </el-popover>

                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="con-item"
                 v-for="(item,index) in data"
                 :key="index">
              <!--<div class="con-item-title">{{item.mblog.page_title}}</div>-->
              <div class="con-item-title">{{item.user.screen_name}}</div>
              <div class="con-item-con"
                   v-html="item.text">{{item.text}}
              </div>
              <div style="display: flex;flex-direction: row;margin-bottom:26px">
                <img v-for="it in item.pic_urls"
                     :src="it.thumbnail_pic" class="weibo-img"/>
              </div>
              <div class="item-bottom cl">
                <div class="fl">
                  <div class="cl">
                    <div class="fl item-bottom-left">{{item.releaseUserName}}</div>
                    <div class="fl item-bottom-left">{{item.created_at}}</div>
                    <!--<div class="fl item-bottom-left">-->
                      <!--<img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.mblog.pending_approval_count||0}}</div>-->
                  </div>
                </div>
                <div class="rt share">
                  <el-popover
                    placement="right"
                    width="100"
                    trigger="hover">
                    <div class="text-left">
                      <div>分享到：</div>
                      <ul id="share1">
                        <li  class="flex-row" @click="weiChat">
                          <img src="../../../src/assets/images/news/微信.svg" alt="">
                          <div>微信</div>
                        </li>
                        <li class="flex-row" @click="qqClick(item)">
                          <img  src="../../../src/assets/images/news/qq.svg" alt="">
                          <div>QQ</div>
                        </li>
                        <!--<li class="flex-row " @click="weibo(item)">-->
                          <!--<img  src="../../../src/assets/images/news/微博.svg" alt="">-->
                          <!--<div>微博</div>-->
                        <!--</li>-->
                      </ul>
                    </div>
                    <div slot="reference">
                      <img src="../../../src/assets/images/share.png" class="icon"/>分享
                    </div>
                  </el-popover>

                </div>
              </div>
            </div>
          </div>
          <div v-if="more" class="more" @click="getMore">{{moreMsg}}</div>
        </div>
      </div>
    </div>
    <div class="content-right ">
      <v-right-content  ref="RightContent"></v-right-content>
    </div>
    <div class="mask-id" v-show="wechatSHareShow">
      <div class="wei text-center wechatShare" >
        <i class="wechatShareClose" @click="wechatShareClose">&times;</i>
        <div id="qrcode" class="text-center flex-column justify-center"></div>
        <div style="margin: 5px 0">微信扫上面二维码</div>
        <div>分享至好友和朋友圈</div>
      </div>
    </div>

  </div>

</template>

<script>
  import QRCode from 'qrcodejs2'
  import API from  './../../assets/js/api'
  import RightContent from './rightContent'

  export default {
    name: "expressNew",
    data(){
      return{
        busfastnewsUrl:API.api.express.busfastnews,
        weiboUrl:API.api.express.weibo,
        data:[],
        type:1,
        active:0,
        pageCurrent:1,
        more:true,
        wechatSHareShow:false,
        moreMsg:'正在加载...',
        wbtitle:[],
        tabs:[
          {id:0,text:'快报'},
          {id:1,text:'微博'},
        ],
        shareUrl:{
          qq:"http://connect.qq.com/widget/shareqq/index.html?",
          qqzone:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?",
          weibo:"http://v.t.sina.com.cn/share/share.php?",
          weixin:""
        },
      }
    },
    methods:{
      tabsClick:function (id) {
        let _this = this
        this.active = id;
        _this.moreMsg = '正在加载...';
        _this.pageCurrent=1;
        _this.data=[];
        if(id===0){
          _this.type=1
          _this.DataList()
        }else {
          _this.type=2
          _this.weiboList()
        }
      },
      DataList:function(){
        let _this = this
        let params={
          isNewsFlash:0,
          pageCurrent:_this.pageCurrent,
          pageSize:5,
        };
        _this.postData(_this.busfastnewsUrl,params,function (res) {
          if (res.code === 0) {
            let data = res.object;
            console.log(data);
            for(var i in data){
              data[i].releaseDate=_this.format(data[i].releaseDate)
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
              }else if(data.length<5){
                _this.more = false
              }else {
                _this.more = true
              }
            }else {
              _this.data=_this.data.concat(dataBlob)
              if(data.length===0||data.length<5){
                _this.moreMsg = '加载完毕'
              }
            }
            data = null;
            dataBlob = null;
          }
        }, (res) => {
          console.log(res)
        })
        setTimeout(function(){
          _this.$emit('is-footer', true)
        },1000);
      },
      weiboList:function(){ //weiboUrl
        let _this = this
        let params={
          pageCurrent:_this.pageCurrent,
          pageSize:5,
        };

        _this.postData(_this.weiboUrl,params,function (res) {
          if (res.code === 0) {
            if(JSON.stringify(res.object) !== "{}" ){
              let data = res.object.statuses;
              for(var i in data){
                data[i].created_at = _this.format(data[i].created_at);
              }
              let dataBlob = [];
              if(data.length>0){
                data.map(function (item) {
                  dataBlob.push(item)
                  // console.log(dataBlob.length)
                });
              }
              _this.moreMsg = '加载更多';
              if(_this.pageCurrent===1){
                _this.data=dataBlob;
                if(data.length===0){
                  _this.moreMsg = '暂无数据'
                }else if(data.length<5){
                  _this.more = false
                }else {
                  _this.more = true
                }
              }else {
                _this.data=_this.data.concat(dataBlob)
                if(data.length===0||data.length<5){
                  _this.moreMsg = '加载完毕'
                }
              }
              data = null;
              dataBlob = null;
            }else {
              _this.moreMsg = '暂无数据'
            }
            data = null;
            dataBlob = null;
          }
        }, (res) => {
          console.log(res)
        })
      },
      getMore:function () {
        let _this = this
        _this.moreMsg = '正在加载...'
        _this.pageCurrent ++
        if(_this.type===1){
          this.DataList()
        }else {
          this.weiboList()
        }
      },
      weiChat:function () {
        let _this = this;
        const h = _this.$createElement;
        document.getElementById("qrcode").innerHTML="";
        let qrcode="";
        qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 150,
          height: 150,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
        _this.wechatSHareShow=true;
        console.log(qrcode);
        qrcode.makeCode(location.href);
        console.log(qrcode)
      },
      wechatShareClose:function(){
        this.wechatSHareShow=false;
      },
      qqClick:function(data){
        let _this = this
        console.log(data)
        _this.share("qq",data);
      },
      weibo:function(data){
        let _this = this
        _this.share("weibo",data);
      },
      share:function(platform,data){//链接生成
        let _this = this
        var qqParameter={
          url:location.href,
          desc:"",
          title:data.title,
          summary:data.smallTitle, /*分享摘要(可选)*/
          site:'果味Pro',
          pics:data.image,
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
    components: {
      'v-right-content': RightContent
    },
    mounted(){
      this.$emit('is-footer', false)
      this.DataList()
      // console.log(this.$refs.abc)
    }
  }
</script>

<style>
  @import "./../home/home.css";
  @import "./../news/news.css";
  @import "./expressNew.css";
</style>
