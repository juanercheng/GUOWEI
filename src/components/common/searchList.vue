<template>

  <div>
    <div class="top-search">
      <div class="container ">
          <div class="input-box cl">
            <input  type="text"
                    placeholder="请输入关键字搜索"
                    v-model="search"
                    @keyup.enter ="doSearch"
                     class="search-inputs"/>
            <img src="../../../src/assets/images/searchBtn.png"
                 v-on:click="doSearch"
                 style="width: 90px;height: 48px;cursor: pointer"/>
          </div>
      </div>
    </div>
    <div class="container">
     <div style="margin: 0 auto;width: 93.8%">
       <div class="search-title">含  "{{search}}"  的搜索结果{{dataList.length}} 条</div>
       <div class="special-list" v-if="dataList"
            :style="dataList.length<=1?'min-height:380px':null">
         <div class="special-item cl" v-for="(item,index) in dataList" :key="index">
           <div class="home-content-left-box special-img fl">
             <img :src="item.smallImage" class="img"/>
           </div>
           <div class="home-content-right-box special-right-box fl">
             <div>
               <div class="cl" style="overflow:hidden;margin-bottom: 21px">
                 <img v-show="item.tag===2" src="../../../src/assets/images/home/new.png" class="label-icon"/>
                 <img v-show="item.tag===1" src="../../../src/assets/images/home/hot.png" class="label-icon"/>
                 <div><a  v-on:click="goDetails(item.id)"
                          style=" overflow: hidden;
                               text-overflow:ellipsis;
                               white-space: nowrap;"
                          class="item-title-common">{{item.title}}</a></div>
               </div>
               <div class="item-content"
                    style=" display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;line-height: 21px"
                    v-on:click="goDetails(item.id)">{{item.smallTitle}}</div>
             </div>
             <div class="item-bottom cl">
               <div class="fl">
                 <div class="cl">
                   <div class="fl item-bottom-left">{{item.authorName}}</div>
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
  </div>
</template>

<script>
import API from './../../assets/js/api'
export default {
  name: "searchList",
  data(){
    return{
      moreMsg:'加载更多',
      search:this.$route.query.searchVal,
      more:true,
      searchDataUrl:API.api.searchList.searchUrl,
      pageCurrent:1,
      pageSize:3,
      dataList:[]
    }
  },
//路由监听
  watch: {
    '$route'(to, from) {
      if (to.query.searchVal === from.query.searchVal) return;
      this.search=to.query.searchVal;
      this.dataList=[];
      this.Data();
    }
  },
  components: {

  },
  methods:{
    Data:function () {
      let _this=this;
      let params={
        key:_this.search,
        pageCurrent:_this.pageCurrent,
        pageSize:_this.pageSize
      }
      _this.getData(_this.searchDataUrl,params,(res)=>{
        console.log(res);
        if(res.code===0){
          let data=res.object;
          if(data.length>0){
            for (let i=0;i<data.length;i++){
              if(data.length===_this.pageSize){
                _this.dataList.push(data[i]);
              }else if(data.length<_this.pageSize&&data.length>0){
                _this.dataList.push(data[i]);
                _this.more=false;
              }
            }
            _this.moreMsg='加载更多';
          }else{
            _this.pageCurrent=_this.pageCurrent>=2?_this.pageCurrent--:_this.pageCurrent;
            _this.more=false;
          }
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
    doSearch:function () {
      if(!this.search){
        this.$alert('请输入关键字', '温馨提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
            console.log(32)
          }
        });
      }else {
        this.$router.push({
          path: './searchList',
          query:{searchVal:this.search}
        })
      }
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
    this.Data();
  },
}
</script>


<style>
  @import "./../home/home.css";
  @import "./../column/column.css";
</style>
