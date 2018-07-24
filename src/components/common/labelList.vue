<template>
  <div>
    <div class="label-title">
      {{label}}
    </div>
    <div class="container">
      <div v-if="data"
           :style="data.length<=1?'min-height:450px;padding-top:5%':null"
           style="width: 95%;margin: 0 auto">
        <div class="special-item cl" v-for="item in data" :key="item.id">
          <div class="home-content-left-box special-img fl">
            <img :src="item.smallImage" class="img" v-on:click="goDetails(item.id)"/>
          </div>
          <div class="home-content-right-box special-right-box fl">
            <div>
              <div class="cl" style="overflow:hidden;margin-bottom:2.4%">
                <img v-show="item.tag===2" src="../../../src/assets/images/home/new.png" class="label-icon"/>
                <img v-show="item.tag===1" src="../../../src/assets/images/home/hot.png" class="label-icon"/>
                <div><a  v-on:click="goDetails(item.id)"
                         v-model.trim="item.title"
                         style=" overflow: hidden;
                                 text-overflow:ellipsis;
                                 white-space: nowrap;"
                         class="item-title-common">{{item.title}}</a></div>
              </div>
              <div class="item-content"
                   style=" display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;line-height: 20px"
                   v-on:click="goDetails(item.id)">{{item.smallTitle}}</div>
            </div>
            <div class="item-bottom cl">
              <div class="fl">
                <div class="cl">
                  <div class="fl item-bottom-left" style="cursor: pointer"
                       v-on:click="columnSpecial(item.author)">{{item.authorName}}</div>
                  <div class="fl item-bottom-left">{{item.releaseDate}}</div>
                  <div class="fl item-bottom-left"
                       v-if="item.tag1||item.tag2||item.tag3">
                    <img class="icon" src="../../../src/assets/images/home/label.png"/>
                    <span @click="goLabel(item.tag1)">{{item.tag1}}</span>
                    <span @click="goLabel(item.tag2)">{{item.tag2}}</span>
                    <span @click="goLabel(item.tag3)">{{item.tag3}}</span>
                  </div>
                </div>
              </div>
              <div class="rt"><img src="../../../src/assets/images/home/eye.png" class="icon"/>{{item.lookTimes||0}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="more" class="more" @click="getMore">{{moreMsg}}</div>
    </div>
  </div>
</template>

<script>
import API from './../../assets/js/api'
export default {
  name: "labelList",
  data(){
    return{
      moreMsg:'加载更多',
      label:null,
      more:true,
      searchDataUrl:API.api.searchList.searchUrl,
      pageCurrent:1,
      pageSize:5,
      data:[]
    }
  },
  components: {

  },
  methods:{
    Data:function () {
      let _this=this;
      let params={
        tag:_this.label,
        pageCurrent:_this.pageCurrent,
        pageSize:_this.pageSize
      }
      _this.getData(_this.searchDataUrl,params,(res)=>{
        console.log(res);
        if(res.code===0){
          let data = res.object;
          for(var i in data){
            if(data[i].releaseDate){
              data[i].releaseDate=_this.format(data[i].releaseDate)
            }
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
        }else {
          _this.$alert(res.msg,'错误编码：'+res.code,()=>{
            return true;
          })
        }
      },(res)=>{
        _this.$alert('请求数据失败','失败',()=>{
          return true;
        })
      })
    },
    getMore:function () {
      let _this = this;
      if(_this.more){
        _this.moreMsg = '正在加载...';
        _this.pageCurrent ++;
        this.Data();
      }
    },
  },
  mounted(){
    this.$emit('is-footer', true);
    this.label = this.$route.query.type
    this.Data();
  },
}
</script>


<style>
  @import "./../home/home.css";
  @import "./../column/column.css";
</style>
