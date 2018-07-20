<template>
  <div class="block">
    <div v-if="this.$parent.type==='home'">
      <el-carousel style="overflow: hidden"
                   v-if="homeBanner" trigger="click">
        <el-carousel-item
          v-for="(item,index) in homeBanner"
          :key="index"

          :id="item.id">
          <img :src='item.image' @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)" class="block-item-img img"/>
          <!--<div class="text-mask">{{item.title}}</div>-->
        </el-carousel-item>
      </el-carousel>
    </div>
    <div v-else >
      <el-carousel  style="overflow: hidden" trigger="click">
        <el-carousel-item v-if="otherBanner"
          v-for="(item,index) in otherBanner"
          :key="index" :jumpType="item.jumpType" :jumpUrl="item.jumpUrl"
          :id="item.id">
          <img :src='item.image' class="block-item-img img"/>
          <div class="text-mask">{{item.title}}</div>
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>

<script>
export default {
  props:['homeBanner','otherBanner'],
  name: "banner",
  data () {
    return {}
  },
  mounted(){
    console.log(this.otherBanner)
  }
}
</script>


<style>
  @import "../../assets/css/banner.css";
</style>
