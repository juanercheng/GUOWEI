<template>
  <div>
    <div v-if="isSuccess">
      <v-success ref="Success"></v-success>
    </div>
    <div v-else>
      <div v-if="loading" class="text-center" style="margin-top: 150px">
        正在加载...
      </div>
      <div v-else>
        <!--未认证-->
        <div v-if="!$store.state.isCertified" class="certified text-right">
          <div class="certified-item cl" v-if="certifiedTypes">
            <select value="" v-model="formData.certifiedType"
                    class="certified-item-h rt select"
                    @change='changeType'
                    :style="!formData.certifiedType?'color:#999':'color:#333'"
                    name="certifiedType" >
              <option v-for="item in certifiedTypes" :value="item.id">{{item.text}}</option>
            </select>
            <span class="hint certified-hint" v-show="formDataHint.certifiedHint">{{formDataHint.certifiedHintHtml}}</span>
            <div class="label rt">认证类型</div>
          </div>
          <div class="item-title text-left"
               v-if="formData.certifiedType===1">个人信息</div>
          <div class="certified-item cl">
            <input class="certified-item-h rt"
                   v-model.trim="formData.userName"
                   maxlength="20"
                   placeholder="请输入姓名" />
            <span class="hint name-hint" v-show="formDataHint.nameHint">{{formDataHint.nameHintHtml}}</span>
            <div class="label rt">姓名</div>
          </div>
          <div class="certified-item cl">
            <input class="certified-item-h rt"
                   v-model.trim="formData.idCard"
                   maxlength="18"
                   placeholder="请输入身份证号" />
            <span class="hint card-hint" v-show="formDataHint.cardHint">{{formDataHint.cardHintHtml}}</span>
            <div class="label rt">身份证号</div>
          </div>
          <div class="certified-item cl">
            <input class="certified-item-h rt"
                   v-model.trim="formData.mobile"
                   maxlength="11"
                   type="tel"
                   placeholder="请输入手机号码" />
            <span class="hint tel-hint" v-show="formDataHint.telHint">{{formDataHint.telHintHtml}}</span>
            <div class="label rt">手机号码</div>
          </div>
          <div class="certified-item cl">
            <input class="certified-item-h rt"
                   v-model.trim="formData.email"
                   maxlength="20"
                   type="email"
                   placeholder="请输入邮箱" />
            <span class="hint email-hint" v-show="formDataHint.emailHint">{{formDataHint.emailHintHtml}}</span>
            <div class="label rt">邮箱</div>
          </div>
          <div class="certified-item cl" style="position: relative">
            <div class="certified-item-h rt add-img" >
              <img :src="formData.personImg?formData.personImg:require('../../../assets/images/addImg.png')"
                   style="width: 80px;height: 80px"/>
              <input type="file" @change="upload" id="personImg"
                     style="position: absolute;left: 12%;height:80%;width: 25%;opacity: 0"/>
            </div>
            <span class="hint papers-hint" v-show="formDataHint.papersHint">{{formDataHint.papersHintHtml}}</span>
            <div class="label rt">证件照</div>
          </div>
          <!--企业信息-->
          <div v-if="formData.certifiedType === 1 ">
            <div class="item-title text-left">企业信息</div>
            <div class="certified-item cl">
              <input class="certified-item-h rt"
                     v-model.trim="formData.company"
                     maxlength="20"
                     placeholder="请输入企业名称" />
              <span class="hint company-hint" v-show="formDataHint.companyHint">{{formDataHint.companyHintHtml}}</span>
              <div class="label rt">企业名称</div>
            </div>
            <div class="certified-item cl">
              <input class="certified-item-h rt"
                     v-model.trim="formData.companyId"
                     maxlength="30"
                     placeholder="请输入企业证证件号" />
              <span class="hint company-papers-hint" v-show="formDataHint.companyPapersHint">{{formDataHint.companyPapersHintHtml}}</span>
              <div class="label rt">企业证件号</div>
            </div>
            <div class="certified-item cl" style="position: relative">
              <div class="certified-item-h rt add-img" >
                <img :src="formData.companyImg?formData.companyImg:require('../../../assets/images/addImg.png')"
                     style="width: 80px;height: 80px"/>
                <input type="file" @change="upload" id="businessImg"
                       style="position: absolute;left: 12%;height:80%;width: 25%;opacity: 0"/>
              </div>
              <span class="hint business-license-hint" v-show="formDataHint.businessLicenseHint">{{formDataHint.businessLicenseHintHtml}}</span>
              <div class="label rt">营业执照</div>
            </div>
          </div>
          <div class="text-center" style="margin-top: 28px">
            <button class="btn btn-active" v-on:click="send" style="padding: 1.4% 5.4%">提交</button>
          </div>
        </div>
        <!--认证中-->
        <div v-else class="on-certified">
          <div class="certified-top cl text-center success"
               :style="status.id===2?'padding-bottom:31px;padding-top: 39px;':'padding-bottom:6.7%;padding-top: 6.7%;'">
            <div class="flex-row justify-center">
              <img class="result fl" :src="status.id===2?require('../../../assets/images/mine/failed.png'):require('../../../assets/images/mine/certifiedon.png')"/>
              <div class="fl" :class="status.id===2?'failed':'success'">{{status.info}}</div>
            </div>
            <div v-if="status.id===2" class="smallInfo">{{status.smallInfo}}</div>
            <div v-if="status.id===2">
              <button class="btn btn-reDo" v-on:click="$store.commit('SetAuthentication',false)">重新申请</button>
            </div>
          </div>
          <div class="certified-user-con text-center">
            <table :class="status.id===2?'table02':'table01'">
              <tbody>
              <tr>
                <td>认证类型：</td>
                <td>{{userType}}</td>
              </tr>
              <tr>
                <td>姓名：</td>
                <td>{{formData.userName}}</td>
              </tr>
              <tr>
                <td>身份证号：</td>
                <td>{{formData.idCard}}</td>
              </tr>
              <tr>
                <td>手机号码：</td>
                <td>{{formData.mobile}}</td>
              </tr>
              <tr>
                <td>邮箱：</td>
                <td>{{formData.email}}</td>
              </tr>
              <tr>
                <td>证件照：</td>
                <td style="vertical-align: top"><img :src="formData.personImg" class="table-img"/></td>
              </tr>
              <tr v-show="userType==='企业认证'">
                <td>企业名称：</td>
                <td>{{formData.enterpriseName}}</td>
              </tr>
              <tr  v-show="userType=== '企业认证'">
                <td>企业证件号：</td>
                <td>{{formData.enterpriseIdCard}}</td>
              </tr>
              <tr  v-show="userType=== '企业认证'">
                <td>营业执照：</td>
                <td style="vertical-align: top"><img :src="formData.enterpriseImage" class="table-img"/></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../../../assets/js/api'
import Success from '../success'
export default {
  name: "authenticationMine",
  data(){
    return{
      getAuthenticationUrl: API.api.user.getAuthentication,
      authenticationUrl:API.api.user.authentication,
      fileUploadUrl:this.GLOBAL.domain+ API.api.fileUpload,
      isSuccess:null,
      type:'authenticationMine',
      formDataHint:{
        certifiedHint:false,
        nameHint:false,
        cardHint:false,
        telHint:false,
        emailHint:false,
        papersHint:false,
        companyHint:false,
        companyPapersHint:false,
        businessLicenseHint:false,
        certifiedHintHtml:'',
        nameHintHtml:'',
        cardHintHtml:'',
        telHintHtml:'',
        emailHintHtml:'',
        papersHintHtml:'',
        companyHintHtml:'',
        companyPapersHintHtml:'',
        businessLicenseHintHtml:'',
      },
      certifiedTypes:[
        {id:'',text:'请选择认证类型'},
        {id:2,text:'作者认证'},
        {id:1,text:'企业认证'},
        {id:3,text:'媒体认证'}
      ],
      userType:null,
      formData:{
        certifiedType:'',
        userName:null,
        mobile:null,
        idCard:null,
        email:null,
        businessImg:null,
        company:null,
        companyId:null,
        personImg:null,
        companyImg:null
      },
      status:{
        id:null,
        info:null,
        smallInfo:null
      },
      loading:true
    }
  },
  components:{
   'v-success':Success
  },
  methods:{
    verificationResult:function(parentEle){
      let _this=this;
      _this.formDataHint.nameHint=false;
      _this.formDataHint.cardHint=false;
      _this.formDataHint.telHint=false;
      _this.formDataHint.emailHint=false;
      _this.formDataHint.papersHint=false;
      _this.formDataHint.companyHint=false;
      _this.formDataHint.companyPapersHint=false;
      _this.formDataHint.businessLicenseHint=false;
      _this.formDataHint[parentEle]=true;
    },
    getAuthentication:function(){
      let _this = this;
      let params={
        token:sessionStorage.getItem('token')
      };
      _this.getData(_this.getAuthenticationUrl,params,function (res) {
        if (res.code === 0) {
          _this.loading = false;
          if(res.object){
            let data = res.object;
            // _this.isCertified=true
            _this.$store.commit('SetAuthentication',true);
            _this.status.id=data.result;
            switch (data.result) {
              case 0:
                _this.status.info='认证中，请耐心等待审核';
                _this.status.smallInfo = '';
                break
              case 1:
                _this.status.info='审核通过，认证成功！'
                _this.status.smallInfo = ''
                break
              case 2:
                _this.status.info='审核未通过，请重新申请！'
                _this.status.smallInfo = data.remarks?data.remarks:'未通过'
                break
            }
            switch (data.userType ){
              case 2:
                _this.userType= '作者认证'
                break
              case 1:
                _this.userType= '企业认证'
                break
              case 3:
                _this.userType= '媒体认证'
                break
            }
            _this.formData.userName = data.userName
            _this.formData.mobile = data.userTel
            _this.formData.idCard = data.userIdCard
            _this.formData.email = data.userEmail
            _this.formData.personImg = data.userCertificatesImage
            _this.formData.enterpriseImage = data.enterpriseImage
            _this.formData.enterpriseName = data.enterpriseName
            _this.formData.enterpriseIdCard = data.enterpriseIdCard
            _this.formData.certifiedType= data.userType
          }else {
            // _this.isCertified=false
            _this.$store.commit('SetAuthentication',false)
          }
        }
      }, (res) => {
        console.log(res)
      })
    },
    changeType:function(e){
      // console.log(this.formData.certifiedType)
    },
    upload:function(e){
      let _this= this
      var files = e.target.files || e.dataTransfer.files;
      console.log(e);
      if (!files.length)
        return;
      _this.createImage(files[0],e.target.id);
    },
    createImage(file,id) {
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
            _this.$message.success({
              message: '上传成功',
              center: true
            })
            let data = response.body.object;
            if(id==='personImg'){
              _this.formData.personImg = data;
            }else {
              _this.formData.companyImg = data;
            }
          }
        }).catch(error => {
          console.log(error)
        })
      };
    },
    //提交
    send:function () {
      let _this = this;
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      let reg1 =  /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
      let reg2 = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
      if (!_this.formData.certifiedType){
        _this.verificationResult('certifiedHint');
        _this.formDataHint.certifiedHintHtml='请选择认证类型！';
        return
      }
      if(!_this.formData.userName){
        _this.verificationResult('nameHint');
        _this.formDataHint.nameHintHtml='请输入姓名！';
        return
      }
      if(!_this.formData.idCard){
        _this.verificationResult('cardHint');
        _this.formDataHint.cardHintHtml='请输入身份证号！';
        return
      }
      if (!reg1.test(_this.formData.idCard)) {
        _this.verificationResult('cardHint');
        _this.formDataHint.cardHintHtml='请输入正确的身份证号！';
        return
      }
      if(!_this.formData.mobile){
        _this.verificationResult('telHint');
        _this.formDataHint.telHintHtml='请输入手机号码！';
        return
      }
      if (!reg.test(_this.formData.mobile)) {
        _this.verificationResult('telHint');
        _this.formDataHint.telHintHtml='请输入正确的手机号码！';
        return
      }
      if (!_this.formData.email) {
        _this.verificationResult('emailHint');
        _this.formDataHint.emailHintHtml='请输入邮箱！';
        return
      }
      if (!reg2.test(_this.formData.email)) {
        _this.verificationResult('emailHint');
        _this.formDataHint.emailHintHtml='请输入正确的邮箱！';
        return
      }
      if(!_this.formData.personImg){
        _this.verificationResult('papersHint');
        _this.formDataHint.papersHintHtml='请上传个人证件照！';
        return
      }
      if(_this.formData.certifiedType===1){
        if(!_this.formData.company){
          _this.verificationResult('companyHint');
          _this.formDataHint.companyHintHtml='请输入企业名称！';
          return
        }
        if(!_this.formData.companyId){
          _this.verificationResult('companyPapersHint');
          _this.formDataHint.companyPapersHintHtml='请输入企业证件号！';
          return
        }
        if(!_this.formData.companyId){
          _this.verificationResult('companyPapersHint');
          _this.formDataHint.companyPapersHintHtml='请输入正确的企业证件号！';
          return
        }
        if(!_this.formData.companyImg){
          _this.verificationResult('businessLicenseHint');
          _this.formDataHint.businessLicenseHintHtml='请上传企业证件照';
          return
        }
      }
      let params={
        "createDate": null,
        "enterpriseIdCard": _this.formData.companyId,
        "enterpriseImage": _this.formData.companyImg,
        "enterpriseName": _this.formData.company,
        "examineDate": null,
        "id": null,
        "result": null,
        "sysUserId": null,
        "sysUserName": null,
        "userCertificatesImage":_this.formData.personImg,
        "userEmail": _this.formData.email,
        "userId": null,
        "userIdCard": _this.formData.idCard,
        "userName": _this.formData.userName,
        "userNickName": null,
        "userTel": _this.formData.mobile,
        "userType":_this.formData.certifiedType
      };
      _this.PostJson(_this.authenticationUrl,params,function (res) {
        if(res.code===0){
          _this.isSuccess=true
          _this.$store.commit('SetAuthentication',true)
          _this.$emit('nav-fun', {first:'个人中心', second:'申请认证', third:'已提交', fourth:null});
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  mounted(){
    this.getAuthentication()
    this.$emit('nav-fun', {first:'个人中心', second:'申请认证', third:null, fourth:null});
  },
  beforeDestroy(){
    this.$store.commit('SetAuthentication',false)
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
  // beforeRouteLeave (to, from, next) {
  //   if(this.$store.state.isCertified===false){
  //     this.$confirm('您还没有保存数据，确定要离开吗?', '提示', {
  //       confirmButtonText: '确定',
  //       cancelButtonText: '取消',
  //       type: 'warning'
  //     }).then(() => {
  //       this.$store.commit('SetAuthentication',false)
  //       next()
  //     }).catch(() => {
  //       next(false)
  //     });
  //   }
  // },
}
</script>

<style>
  @import "../mine.css";
  .certified-item{
    position:relative;
  }
  .hint{
    position: absolute;
    top: 74%;
    color: #ff2222;
    font-size: 14px;
    left: 15%;
  }
  .papers-hint,.business-license-hint{
    top:85%;
  }
</style>
