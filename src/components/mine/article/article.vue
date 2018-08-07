<template>
<div>
  <div class="user-con user-con-jifen" style="padding-bottom: 28px">
    <div class="integral-list">
      <div class="flex-row justify-between cl  article-top">
        <div class="fl integral-list-title" >
          文章 {{total}}
        </div>
        <div class="fl integral-list-title" @click="publish" >
          <img src="../../../assets/images/mine/add.png"/>
          <span class="edit-text">新建文章</span>
        </div>
      </div>
      <div class="article-con" v-if="data.length!==0">
        <div class="article-item cl"
             v-for="item in data"
             :id="item.id"
             :key="item.id">
          <div class="fl article-item-img"
               @click="goMineDetails(item.id)"><img :src="item.image" class="img"/></div>
          <div class="fl article-con-right-box" >
              <div class="article-item-title"
                   @click="goMineDetails(item.id)"
                 style=" overflow: hidden;  text-overflow:ellipsis; white-space: nowrap;">{{item.title}}</div>
              <div class="article-item-content"
                 style=" overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                 @click="goMineDetails(item.id)">{{item.smallTitle}}</div>
              <div class="article-item-bottom cl">
                <div class="fl">
                  <div class="cl">
                    <div class="fl article-item-bottom-left">{{item.releaseDate}}</div>
                    <div class="fl article-item-bottom-left">
                      <img v-if="item.tag1||item.tag2||item.tag3" class="icon" src="../../../../src/assets/images/home/label.png"/>
                      <span @click="goLabel(item.tag1,1)">{{item.tag1}}</span>
                      <span @click="goLabel(item.tag2,1)">{{item.tag2}}</span>
                      <span @click="goLabel(item.tag3,1)">{{item.tag3}}</span>
                    </div>
                  </div>
                </div>
                <div class="rt"><img src="../../../../src/assets/images/home/eye.png" class="icon"/>  {{item.lookTimes||0}}</div>
              </div>
          </div>
        </div>
      </div>
      <div v-else style="margin: 80px">
        {{msg}}
      </div>
      <div class="next-page text-right"
           v-if="total!==0"
           style="margin: 30px 0 0 0">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          @prev-click="handleprevClick"
          @next-click="handlenextClick"
          :total="total/pageSizes * 10">
        </el-pagination>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import API from  './../../../assets/js/api'
export default {
  name: "mineArticle",
  props:['clear'],
  data(){
    return{
      id:null,
      getMyNewsUrl:API.api.user.getMyNews,
      pageCurrent:1,
      pageSizes:4,
      data:[],
      total:null,
      msg:'正在加载...'
    }
  },
  methods:{
    getList:function(){
      let _this = this
      let params = {
        pageCurrent:_this.pageCurrent,
        pageSize:_this.pageSizes,
        token:sessionStorage.getItem('token')
      }
      _this.getData(_this.getMyNewsUrl,params,function (res) {
        console.log(res)
        if (res.code === 0) {
          let data = res.object.list;
          _this.total = res.object.total
          if(_this.total===0){
            _this.msg='暂无文章'
          }else {
            _this.msg = '正在加载...'
          }
          for(var i in data){
            data[i].releaseDate=_this.format(data[i].releaseDate)
            // data[i].mainText=_this.delHtmlTag(data[i].mainText)
          }
          _this.data = data
        }
      }, (res) => {
        console.log(res)
      })
    },
    handleCurrentChange:function(val){
      let _this = this
      _this.pageCurrent = val;
      _this.getList()
    },
    handleprevClick:function(){
      let _this = this
      _this.pageCurrent --;
      _this.getList()
    },
    handlenextClick:function(){
      let _this = this
      _this.pageCurrent ++;
      _this.getList()
    },
    goMineDetails:function(id){
      this.$router.push({
        path: '/mine/articleDetails',
        query:{id:id}
      })
    },
    publish:function () {
      let _this = this
      if(sessionStorage.getItem('userLevel')==='未认证'){
        _this.$confirm('你还没有认证，请先认证！', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText:'取消',
          showClose:false,
          closeOnClickModal:false,
          confirmButtonClass:'btn-confirm',
          cancelButtonClass:'btn-cancel'
        })
          .then(() => {
            _this.$router.push({
              path:'./authentication'
            })
          })
          .catch(action => {
            console.log('cancel')
          })
      }else if(sessionStorage.getItem('userLevel')==='认证中'){
        _this.$alert('认证中，请耐心等待通过审核之后再发布文章！', '温馨提示', {
          confirmButtonText: '确定',
          confirmButtonClass:'btn-confirm',
          callback: action => {
            console.log('ok')
          }
        });
      }else if(sessionStorage.getItem('userLevel')==='未通过'){
        _this.$confirm('您的认证没有通过，请重新认证！', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText:'取消',
          showClose:false,
          closeOnClickModal:false,
          confirmButtonClass:'btn-confirm',
          cancelButtonClass:'btn-cancel'
        })
          .then(() => {
            _this.$router.push({
              path:'./authentication'
            })
          })
          .catch(action => {
            console.log('cancel')
          })
      }else {
        _this.$router.push({
          path: '/mine/addArticle',
        })
      }
    }
  },
  mounted(){
    this.getList()
    this.$emit('nav-fun', {first:'个人中心', second:'我的文章', third:null, fourth:null});
  },
  beforeDestroy(){
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
}
</script>

<style>
  @import "../mine.css";
</style>
