<template>
  <div style="position:relative;">
    <div class="aboutHeadImg" style="width: 100%;" ref="aboutHeadImg">
      <img src="../../../src/assets/images/About/bj.png" alt="" style="width:100%;height:310px;">
    </div>
    <div class="container">
      <el-tabs id="aboutTab"
               v-if="editableTabs"
               v-model="activeName" type="card" @tab-click="tabChange">
        <el-tab-pane
          :key="item.name"
          v-for="(item,index) in editableTabs"
          :label="item.label"
          :name="item.name"
        >
          <div class="el-tab-content"
               ref="elTabContent"
               v-html="item.content"
               style="line-height: 36px;">{{item.content}}</div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
  import API from  './../../assets/js/api'
  export default{
    name: "about",
    data(){
      return {
        activeName: this.$route.params.titleName?this.$route.params.titleName:'aboutUs',
        changeName:sessionStorage.getItem('changeName')?sessionStorage.getItem('changeName'):'',
        // tabPosition:top,
        editableTabs:[{id:0,label:'关于我们',name:'aboutUs',content:''},
          {id:1,label:'联系我们',name:'contactUs',content:''},
          {id:2,label:'加入我们',name:'joinUs',content:''},
          {id:3,label:'版权声明',name:'copyrightNotice',content:''}],
        parms:{
          aboutUs:'CLAUSE_ABOUT',
          joinUs:'JOIN_ME',
          contactUs:'CONTACT_WE',
          copyrightNotice:'COPYRIGHT_STATEMENT'
        }
      }
    },
    methods:{
      getDataFn:function(activeName){
        let vm=this;
        vm.getData(API.api.about.aboutUrl,{ClauseType:vm.parms[activeName]},function(res){
          if (res.code===0 ) {
            var edIndex='';
            for(let i=0;i<vm.editableTabs.length;i++){
              if(vm.editableTabs[i].name===activeName)edIndex=vm.editableTabs[i].id;
            }
            vm.editableTabs[edIndex].content=res.object.content;
          }else{
            vm.$message({
              message:res.msg
            })
          }
        },(res) => {
          console.log(res)
        } )
      },
      tabChange:function(val){
        // if(val.name===this.changeName)return true;
        // debugger
        sessionStorage.setItem('changeName',val.name);
        this.getDataFn(val.name);
      },
    },
    watch:{
      '$route'(to,from){
        if(to.params.titleName===from.params.titleName)return;
        this.activeName=to.params.titleName?to.params.titleName:'aboutUs';
        this.getDataFn(this.activeName);
      }
    },
    mounted: function (){
      this.getDataFn(this.activeName)
      // this.$nextTick(function () {
      //   let h = window.offsetHeight || document.documentElement.offsetHeight || document.body.offsetHeight;
      //   let headerHeight=this.$parent.$children[0].$refs.headerLine.offsetHeight;
      //   let footerHeight=this.$parent.$children[2].$refs.footer.offsetHeight;
      //   let aboutHeadImg=this.$refs.aboutHeadImg.offsetHeight;
      //   let aboutContent=h-headerHeight-footerHeight-aboutHeadImg-120;
      //   this.$refs.elTabContent.forEach(function(item){
      //     item.style.minHeight=aboutContent+'px';
      //   })
      // })
      this.$emit('is-footer', true)
    }
  }

</script>


<style>
  @import "about.css";
</style>


