  <template>
  <div>
    <div class="news text-left" v-if="busfastnews">
      <div class="news-title">7×24小时快讯</div>
      <div class="new-item" v-for="(item,index) in busfastnews"
           v-if="index<=9"
           :id="item.id"
           :key="item.id">
        <div
          style="line-height: 21px;"
          class="news-item-title">{{item.title}}</div>
        <div style="line-height:18px"
          class="news-item-content">{{item.mainText}}</div>
        <div class="cl news-item-bottom">
          <div class="fl">{{item.releaseDate}}</div>
          <div class="rt"><img src="../../../src/assets/images/home/eye.png" class="icon"/>
            {{item.lookTimes||0}}</div></div>
      </div>
    </div>
    <div class="right-Ad-box relative home-news" v-if="rightAd1">
      <img :src='rightAd1.image'
           @click="goNewUrl(rightAd1.jumpType,rightAd1.jumpUrl,rightAd1.jumpNewsId)"
           class="img"/>
      <div class="advertisement-text"
         >广告</div>
    </div>
    <div class="news text-left " v-if="authorList">
      <div class="news-title">专栏作者</div>
      <div class="author-item cl"
           v-for="(item,index) in authorList"
           :key="index"
           v-if="index<=3"
           :id="item.id" v-on:click="columnSpecial(item.userId)">
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
    <div class="right-Ad-box relative home-news" v-if="rightAd2">
      <img :src='rightAd2.image'
           @click="goNewUrl(rightAd1.jumpType,rightAd1.jumpUrl,rightAd1.jumpNewsId)"
           class="img"/>
      <div class="advertisement-text">广告</div>
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
    <div class="right-Ad-last relative" v-if="rightAd3">
      <img :src='rightAd3.image'
           @click="goNewUrl(rightAd1.jumpType,rightAd1.jumpUrl,rightAd1.jumpNewsId)"
           class="img"/>
      <div class="advertisement-text">广告</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rightContent",
  props:['busfastnews','companyList','authorList','rightAd1','rightAd2','rightAd3'],
  data(){
    return{}
  },
  methods:{
    columnSpecial:function (id) {
      this.$router.push({
        path: './columnSpecial',
        query:{id:id}
      })
    }
  },
  mounted(){
    // console.log('companyList',this.companyList)
  },
}
</script>

