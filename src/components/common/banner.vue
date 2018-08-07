<template>
  <div class="block">
    <div>
      <el-carousel style="overflow: hidden"
                   v-if="$parent.type==='home'" trigger="click">
        <el-carousel-item
          v-for="(item,index) in homeBanner"
          :key="index"
          :id="item.id">
          <img :src='item.image'
               @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
               class="block-item-img img"/>
          <div class="text-mask">{{item.title}}</div>
        </el-carousel-item>
      </el-carousel>
      <el-carousel style="overflow: hidden"
                   v-else-if="$parent.type==='news'"   trigger="click">
        <el-carousel-item
          v-for="(item,index) in newsBanner"
          :key="index"
          :id="item.id">
          <img :src='item.image'
               @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
               class="block-item-img img"/>
          <div class="text-mask">{{item.title}}</div>
        </el-carousel-item>
      </el-carousel>
      <el-carousel style="overflow: hidden"
                   v-else trigger="click">
        <el-carousel-item
          v-for="(item,index) in columnBanner"
          :key="index"
          :id="item.id">
          <img :src='item.image'
               @click="goNewUrl(item.jumpType,item.jumpUrl,item.jumpNewsId)"
               class="block-item-img img"/>
          <div class="text-mask">{{item.title}}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props:['homeBanner','newsBanner','columnBanner'],
  name: "banner",
  data () {
    return {
    }
  },
  mounted(){
  }
}
</script>


<style>
  @import "../../assets/css/banner.css";
</style>
