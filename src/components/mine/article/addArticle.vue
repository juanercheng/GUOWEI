<template>
  <div>
    <div v-if="isSuccess">
      <v-success ref="Success"></v-success>
    </div>
    <div v-else>
      <div class="user-con text-left" style="padding: 5.6% 6.9% 6.6% 4.9%">
        <table>
          <tr class="add-item">
            <td class="lable-add">分类</td>
            <td>
              <select value="" v-model="newsType"
                      class="add-input" style="width: 100%;padding-left: 14px">
                <option v-for="item in options"
                        :value="item.remarks">{{item.name}}</option>
              </select>
            </td>
          </tr>
          <tr class="add-item">
            <td class="lable-add">标题</td>
            <td>
              <input placeholder="请输入标题"
                     class="add-input"
                     maxlength="50"
                     v-model.trim="title" />
            </td>
          </tr>
          <tr class="add-item">
            <td class="lable-add">标签</td>
            <td>
              <input placeholder="标签一"  maxlength="5" v-model.trim="tag1" class="fl small-input"/>
              <input placeholder="标签二"  maxlength="5" v-model.trim="tag2" class="fl small-input"/>
              <input placeholder="标签三"  maxlength="5" v-model.trim="tag3" class="fl small-input "/>
              <div class="fl" style="line-height: 40px">（每个标签不超过5个字）</div>
            </td>
          </tr>
          <tr class="add-item">
            <td class="lable-add">主图</td>
            <td>
              <div style="position: relative">
                <img v-if="image"  :src="image" class="add-imgs">
                <div v-else class="add-imgs">
                  <img src="../../../assets/images/addImg.png"
                       class=""/>
                </div>
                <input type="file" id="FileUpload"
                       style=" position: absolute;top:1%;height: 100%;opacity: 0"
                       @change="upload" />
              </div>
            </td>
          </tr >
          <tr class="add-item">
            <td class="lable-add">简介</td>
            <td>
               <textarea
                 placeholder="请输入文章摘要"
                 v-model.trim="smallTitle"
                 class="add-textarea"
                 maxlength="255"
                 rows="4"></textarea>
            </td>
          </tr>
          <tr class="add-item">
            <td class="lable-add">正文</td>
            <td>
              <div style="width: 100%">
                　<div id="editor"  type="text/plain" ></div>
              </div>
            </td>
          </tr>
          <tr class="add-item">
            <td class="lable-add">责任编辑</td>
            <input placeholder="请输入责任编辑"
                   maxlength="20"
                   class="add-input"
                   v-model.trim="responsibleEditor"/>
          </tr>
        </table>
        <div class="text-center" style="margin-top:5.2%">
          <button class="btn btn-active" v-on:click="publish">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import '../../../../static/UE/ueditor.config.js'
import '../../../../static/UE/ueditor.all.js'
import '../../../../static/UE/lang/zh-cn/zh-cn.js'
import '../../../../static/UE/ueditor.parse.min.js'
// import E from 'wangeditor'
import Success from '../success'
import API from '../../../assets/js/api'
export default {
  name: "addArticle",
  data(){
    return{
      type:'addArticle',
      fileUploadUrl:this.GLOBAL.domain+ API.api.fileUpload,
      cfgUrl:API.api.cfg.dictInfo,
      saveNewsUrl:API.api.user.saveNews,
      isSuccess:false,
      options:[],
      newsType:null,
      title:null,
      tag1:null,
      tag2:null,
      tag3:null,
      image:null,
      smallTitle:null,
      responsibleEditor:null,
      mainText: '',
      editor:null,
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
    }
  },
  components:{
    'v-success':Success
  },
  methods:{
    upload:function(e){
      let _this= this
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      _this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        vm.image = e.target.result;
        let formData = new FormData();
        formData.append("myfile", file);
        vm.$http.post(vm.fileUploadUrl,formData,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
          if(response.body.code===0){
            vm.$message.success({
              message: '上传成功',
              center: true
            })
            let data = response.body.object;
            vm.image = data;
            console.log(vm.image )
          }
        }).catch(error => {
          console.log(error)
        })
      };
    },
    newsTypeFun:function(){
      let _this = this;
      let params={
        code:'TYPE_NEWS'
      };
      _this.getData(_this.cfgUrl,params,function (res) {
        // console.log(res)
        if (res.code === 0) {
          let data = res.object;
          _this.options = data
          for (let i in _this.options){
            _this.newsType=_this.options[0].remarks
          }
        }
      }, (res) => {
        console.log(res)
      })
    },

    publish:function () {
      let _this = this
      if(!_this.title){
        _this.$message.error({
          message: '请输入标题！',
          type:'warning',
          center: true
        });
        return
      }
      if(!_this.smallTitle){
        _this.$message.error({
          message: '请输入简介！',
          type:'warning',
          center: true
        });
        return
      }
      if(!_this.image){
        _this.$message.error({
          message: '请上传主图！',
          type:'warning',
          center: true
        });
        return
      }
      _this.mainText=_this.editor.getContent()
      if(!_this.mainText){
        _this.$message.error({
          message: '请输入正文！',
          type:'warning',
          center: true
        });
        return
      }
      if(!_this.responsibleEditor){
        _this.$message.error({
          message: '请输入责任编辑！',
          type:'warning',
          center: true
        });
        return
      }

      let params={
        "author": null,
        "examineType":null,
        "id": null,
        "image": _this.image,
        "isAdvertisement": null,
        "isHotspot": null,
        "lookTimes":null,
        "mainText": _this.mainText,
        "isRelease": null,
        "newsRemarks2": null,
        "newsRemarks3": null,
        "newsType": _this.newsType,
        "releaseDate": null,
        "releaseType": null,
        "releaseUserId": null,
        "responsibleEditor": _this.responsibleEditor,
        "smallImage": null,
        "smallTitle": null,
        "sort": null,
        "sortTime": null,
        "tag": null,
        "tag1": _this.tag1,
        "tag2": _this.tag2,
        "tag3": _this.tag3,
        "title": _this.title
      };
      console.log(params)
      _this.PostJson(_this.saveNewsUrl,params,function (res) {
        console.log(res)
        if(res.code===0){
          _this.isSuccess=true
          _this.$emit('nav-fun', {first:'个人中心', second:'我的文章', third:null, fourth:null});
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    const _this = this;
    //分类接口
    _this.newsTypeFun()
    _this.editor = UE.getEditor('editor', _this.config); // 初始化UE
    _this.editor.addListener("ready", function () {
      if(_this.mainText){
        _this.editor.setContent(_this.mainText); // 确保UE加载完成后，放入内容。
      }
    });
    _this.$emit('nav-fun', {first:'个人中心', second:'我的文章', third:'发布文章', fourth:null});
  },
  destroyed() {
    this.editor.destroy();
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
}
</script>

<style>
  @import "../mine.css";
  .add-item td{
    padding-bottom: 2.4%;
    /*overflow: hidden;*/
  }
  .lable-add{
    height: 40px;
    line-height: 40px;
    /*margin-right: 16px;*/
    /*display: inline-block;*/
    min-width: 64px;
    text-align: right;
    vertical-align: top;
    padding-right: 16px;
  }
  .add-input{
    height: 40px;
    width: 97%;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: solid 1px #ebebeb;
    padding-left: 20px;
  }
  .add-imgs{
    width: 80px;
    height: 80px;
    overflow: hidden;
  }
  .add-textarea{
    width: 97%;
    background-color: #f9f9f9;
    border-radius: 4px;
    border: solid 1px #ebebeb;
    padding: 13px 0 0 20px;
    font-size: 14px;
  }


</style>
