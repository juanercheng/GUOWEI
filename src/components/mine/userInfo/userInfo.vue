<template>
  <div>
    <div class="user-con">
      <div v-if="isSuccess">
        <v-success ref="Success"></v-success>
      </div>
      <div v-else>
        <div v-if="!$store.state.isEdit">
          <div class="text-right flex-row justify-right">
            <img src="../../../assets/images/mine/edit.png"/>
            <span class="edit-text"
                  v-on:click="
                  $store.commit('SetSaveData',true);
                  $emit('nav-fun',
                    {
                      first:'个人中心',
                      second:'编辑',
                      third:null,
                      fourth:null
                    });"
            >编辑资料</span>
          </div>
          <div style="position: relative;" class="user-img-con">
            <img :src="headPortrait?headPortrait:require('../../../assets/images/mine/touxiang.png')"
                 class="img"/>
            <div v-if="userLevel"
                 :class="userLevel==='认证作者'?'auth1':userLevel==='认证企业'?'auth2':userLevel==='认证媒体'?'auth3':'auth4'"
                 :style="userLevel.length===4?'left:24%;':'left:32%;'">{{userLevel}}</div>
          </div>
          <table class="user-box" v-if="userName">
            <tr >
              <td class="text-right user-item">昵称：</td>
              <td class="text-left user-item td2">{{userName}}</td>
            </tr>
            <tr>
              <td class="text-right user-item">手机号码：</td>
              <td class="text-left user-item td2">{{mobile}}</td>
            </tr>
            <tr v-if="signature">
              <td class="text-right user-item">个性签名：</td>
              <td class="text-left user-item td2">
                <div style="width: 202px;line-height: 25px">{{signature}}</div>
              </td>
            </tr>
          </table>
          <div>
            <button class="btn-default btn "
                    style="margin-bottom: 5.36%;border-color: #333"
                    @click="publish">发表文章</button>
          </div>
        </div>
        <div v-else>
          <div style="margin-top: 7.15%;position: relative" >
            <img :src="headPortrait?headPortrait:require('../../../assets/images/addImg.png')"
                 style="width: 110px;height: 110px;border-radius: 50%;border: 5px solid #c4c4c4;"/>
            <input type="file" @change="upload"
                   style="position: absolute;left: 43%;height: 100%;width: 15%;opacity: 0"/>
            <div class="upload">上传头像</div>
          </div>
          <div class="user-edit-box">
            <div class="edit-item">
              <div class="label"></div>
              <div class="warning" v-show="isWarning">
                <div class="warning-mine" style="width: 312px" v-show="isWarning">{{warning}}</div>
              </div>
            </div>
            <div class="edit-item">
              <div class="label">昵称</div>
              <input placeholder="请输入昵称" maxlength="20" class="input" v-model.trim="userName"/>
            </div>
            <div class="edit-item relative">
              <div class="label">个性签名</div>
              <textarea placeholder="请输入个性签名"
                        rows="6"
                        maxlength="30"
                        class="textarea" v-model.trim="signature"></textarea>
              <span class="count">{{signature.length}}/30</span>
            </div>
          </div>
          <div>
            <button class="btn btn-active" v-on:click="save">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Success from '../success'
import API from '../../../assets/js/api'
export default {
  name: "userInfo",
  props:['active'],
  data(){
    return{
      type:'userInfo',
      fileUploadUrl:this.GLOBAL.domain+ API.api.fileUpload,
      userInfoUrl: API.api.user.userInfo,
      updateInfoUrl: API.api.user.updateInfo,
      headPortrait:null,
      pushPosition:null,
      userLevel:null,
      userName:null,
      mobile:null,
      signature:'',
      isSuccess:null,
      isWarning:false,
      warning:''
    }
  },
  components:{
    'v-success':Success
  },
  methods:{
    getUserInfo:function(){
      let _this = this
      let params={
        token:sessionStorage.getItem('token')
      };
      _this.getData(_this.userInfoUrl,params,function (res) {
          if (res.code === 0) {
            let data = res.object;
            _this.userName = data.nickName?data.nickName:data.userName;
            switch ( data.userLevel) {
              case 0:
                data.userLevel = '未认证'
                break
              case 1:
                data.userLevel = '认证企业'
                break
              case 2:
                data.userLevel = '认证作者'
                break
              case 3:
                data.userLevel = '认证媒体'
                break
            }
            if (data.authStatus===0){
              data.userLevel = '认证中'
            }else if(data.authStatus===2){
              data.userLevel = '未通过'
            }
            _this.userLevel = data.userLevel;
            _this.mobile = data.tel;
            _this.signature = data.signature?data.signature:''
            _this.headPortrait = data.headPortrait
          }else if(res.code === 101){
            _this.$message('登录已失效，请重新登录！');
            _this.$router.push({
              path:'/login'
            })
          }
      }, (res) => {
        console.log(res)
      })

    },
    upload:function(e){
      let _this= this
      var files = e.target.files || e.dataTransfer.files;
      console.log(files[0].type)
      if (!files.length)
        return;
      if(files[0].type !== 'image/jpeg' && files[0].type !== 'image/png' && files[0].type !== 'image/gif') {
        _this.$message.error({
          message: '请上传有效的图片文件！',
          center: true,
        })
        return;
      }
      _this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var _this = this;
      reader.readAsDataURL(file);

      reader.onload = (e) => {
        _this.image = e.target.result;
        let formData = new FormData();
        formData.append("myfile", file);
        _this.$http.post(_this.fileUploadUrl,formData,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
          console.log(response.body)
          if(response.body.code===0){
            _this.$emit('is-update', false)
            _this.$message.success({
              message: '头像上传成功',
              center: true
            })
            let data = response.body.object;
            _this.headPortrait = data;
          }
        }).catch(error => {
          console.log(error)
        })
      };
    },
    save:function () {
      let _this = this
      if(!_this.userName){
        _this.warning='请输入昵称！';
        _this.isWarning=true;
        return
      }
      if(!_this.signature){
        _this.warning='请输入个性签名！';
        _this.isWarning=true;
        return
      }
      let params={
          "userName":null,
          "signature":_this.signature,
          "headPortrait":_this.headPortrait,
          "createDate": null,
          "id": null,
          "newsNumber": null,
          "nickName": _this.userName,
          "pushOneSort": null,
          "pushPosition": null,
          "pushThreeSort": null,
          "pushTwoSort": null,
          "score": null,
          "sex": null,
          "state": null,
          "tel": null,
          "totalBrowsing": null,
          "userLevel": null,
          "userRemarks2": null,
          "userRemarks3": null,
          "userType": 2
      };
      _this.PostJson(_this.updateInfoUrl,params,function (res) {
        if(res.code===0){
          _this.$emit('is-update', true);  //更新父组件个人信息
          _this.$emit('nav-fun', {first:'个人中心', second:'提交成功', third:null, fourth:null});//更新父组件nav信息
          sessionStorage.setItem('headPortrait',res.object.headPortrait)
          _this.$store.commit('setUpheadPortrait',res.object.headPortrait)
          _this.isWarning=false;
          setTimeout(function(){
            _this.$store.commit('SetSaveData',false)
            _this.isSuccess=true;
          },500);
        }
      }, (res) => {
        console.log(res)
      })

    },
    publish:function () {
      let _this = this
      if(_this.userLevel==='未认证'){
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
      }else if(_this.userLevel === '未通过'){
        _this.$confirm('您的认证没有通过，请重新认证通过审核之后再发布文章！', '温馨提示', {
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
      }else if(_this.userLevel === '认证中'){
        _this.$alert('认证中，请耐心等待通过审核之后再发布文章！', '温馨提示', {
          confirmButtonText: '确定',
          confirmButtonClass:'btn-confirm',
          callback: action => {
           console.log('ok')
          }
        });
      } else {
        _this.$router.push({
          path: '/mine/addArticle',
        })
      }
    }
  },
  mounted(){
    this.getUserInfo()
  },
  beforeDestroy(){
    this.$store.commit('SetSaveData',false)
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
}
</script>

<style>
  @import "../mine.css";
</style>
