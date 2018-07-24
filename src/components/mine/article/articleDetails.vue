<template>
  <div>
    <div class="user-con text-left" v-if  ="data">
      <div style="font-size: 26px;color: #2f2f2f;line-height: 39px;">{{data.title}}</div>
      <div style="font-size: 14px;margin-top: 30px">
        <div class="article-item-bottom cl">
          <div class="fl">
            <div class="cl">
              <div class="fl article-item-bottom-left">{{data.releaseDate}}</div>
              <div class="fl article-item-bottom-left">
                <img class="icon"
                     v-if="data.tag1||data.tag2||data.tag3"
                     src="../../../../src/assets/images/home/label.png" /> {{data.tag1}} {{data.tag2}} {{data.tag3}}</div>
            </div>
          </div>
          <div class="fl"><img src="../../../../src/assets/images/home/eye.png" class="icon"/>  {{data.lookTimes||0}}</div>
        </div>
      </div>
      <div style="margin-top: 60px;font-size: 18px;line-height: 36px;	color: #5b5b5b;overflow-x: hidden">
        <img :src="data.image" class="img">
        <div v-html="data.mainText">
          {{data.mainText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import API from  './../../../assets/js/api'
  export default {
    name: "articleDetails",
    data(){
      return{
        newsIdUrl:API.api.news.newsId,
        data:null,
        id:null,
      }
    },
    methods:{
      getDetails:function () {
        let _this = this
        let id = _this.id
        _this.GetJson(_this.newsIdUrl,id,function (res) {
          console.log(res.object)
          if (res.code === 0) {
            let data = res.object;
            data.releaseDate=_this.format(data.releaseDate)
            _this.data = data
          }
        }, (res) => {
          console.log(res)
        })
      }
    },
    mounted(){
      this.id=this.$route.query.id
      this.getDetails()
      this.$emit('nav-fun', {first:'个人中心', second:'我的文章', third:'详情', fourth:null});
    },
    beforeDestroy(){
      this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
    }
  }
</script>

<style>
  @import "../mine.css";
</style>
