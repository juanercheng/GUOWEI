<template>
  <div>
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item>个人中心</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item><span style="margin:0 5px">></span>登录密码设置</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="step===0&&!isSuccess"><span style="margin:0 5px">></span>输入手机号</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="isSuccess"><span style="margin:0 5px">></span>设置成功</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item v-show="step===1"><span style="margin:0 5px">></span>输入手机号<span style="margin:0 5px">></span>输入密码</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <div v-if="isSuccess">
      <v-success ref="Success"></v-success>
    </div>
    <div v-else>
      <div class="user-con password-con">
        <div class="user-edit-box" >
          <div class="edit-item">
            <div class="label"></div>
            <div class="warning-mine" v-show="isWarning">{{warning}}</div>
          </div>
        </div>
        <div v-if="step===0">
          <div class="user-edit-box" >
            <div class="edit-item edit-item-password">
              <div class="label">手机号码</div>
              <input placeholder="请输入手机号码" type="tel"
                     maxlength="11"
                     class="input-password"
                     v-model.trim="formData.mobile"/>
            </div>
            <div class="edit-item edit-item-password">
              <div class="label">验证码</div>
              <input placeholder="请输入验证码" maxlength="6" class="input-password code-input" v-model.trim="formData.code" />
              <el-button class="code"
                         v-on:click="getCodeFun"
                         :disabled="getCode"
                         type="info" >{{codeMsg}}</el-button>
            </div>
          </div>
          <div style="margin-top: 10.3%">
            <button class="btn btn-active" v-on:click="next">下一步</button>
          </div>
        </div>
        <div v-else-if="step===1">
          <div class="user-edit-box" >
            <div class="edit-item edit-item-password">
              <div class="label">密码</div>
              <input placeholder="请输入密码" type="password"
                     maxlength="12"
                     class="input-password"
                     v-model.trim="formData.oldPassword"/>
            </div>
            <div class="edit-item edit-item-password">
              <div class="label">密码</div>
              <input placeholder="请输入密码"
                     maxlength="12"
                     class="input-password"
                     type="password"
                     v-model.trim="formData.password"/>
            </div>
          </div>
          <div style="margin-top:10.3%">
            <button class="btn btn-active" v-on:click="save">完成</button>
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
  name: "password",
  data(){
    return{
      type:'password',
      isSuccess:null,
      urlCode: API.api.user.getMobileCode,
      pwdUpdate: API.api.user.pwdUpdate,
      checkSmsCode:  API.api.user.checkSmsCode,
      formData:{
        mobile:null,
        code:null,
        oldPassword:null,
        password:null
      },
      codeMsg:'获取验证码',
      getCode:false,
      step:0,
      warning:'',
      isWarning:false
    }
  },
  components:{
    'v-success':Success
  },
  methods:{
    getCodeFun:function(){
      let _this = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if(!_this.formData.mobile){
        _this.warning= '请输入手机号码！',
        _this.isWarning=true;
        return
      }
      if (!reg.test(_this.formData.mobile)) {
        _this.warning= '请输入正确的手机号码！',
        _this.isWarning=true;
        return
      }

      let mobileEncrypt = encodeURI(_this.encryptByDES(_this.formData.mobile, 'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y'))
      // http
      // var mobileEncrypt = encodeURIComponent(encodeURIComponent(_this.encryptByDES(_this.tel, 'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y')))
      let params = {
        type: 3,
        userId: sessionStorage.getItem('userid'),
        mobile: _this.formData.mobile,
        mobileEncrypt: mobileEncrypt,
        driverName: 3,
        userType:2
      };
      _this.postData(_this.urlCode, params, function (res) {
        console.log(res)
        if(res.code===0){
          _this.$message({
            message: '验证码已发送',
            type: 'success'
          })
          _this.isWarning=false;
          let i;
          i = 60;
          let timer = setInterval(function () {
            i = i - 1;
            _this.codeMsg = i + 's';
            _this.getCode = true;
            if (i === 0) {
              clearInterval(timer);
              _this.getCode = false;
              _this.codeMsg = '获取验证码'
            }
          }, 1000)
        }else {
          _this.getCode = true;
          _this.codeMsg =res.msg
        }
      })
    },
    next:function(){
      let _this = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if(!_this.formData.mobile){
        _this.warning= '请输入手机号码！',
        _this.isWarning=true;
        return
      }
      if (!reg.test(_this.formData.mobile)){
        _this.warning= '请输入正确的手机号码！',
        _this.isWarning=true;
        return
      }
      if(!_this.formData.code){
        _this.warning= '请输入验证码！',
        _this.isWarning=true;
        return
      }
      //判断验证码是否为数字
      if( /^\d+$/.test(_this.formData.code)===false){
        _this.warning= '验证码必须是数字！',
        _this.isWarning=true;
        return
      }
      let params = {
        phone:_this.formData.mobile,
        code:_this.formData.code
      }
      _this.postData(_this.checkSmsCode, params, function (res) {
        console.log(res)
        if (res.code === 0) {
          _this.step=1
          _this.isWarning=false;
          _this.$emit('nav-fun', {first:'个人中心', second:'登录密码设置', third:'输入手机号', fourth:'输入密码'});
        } else {
          _this.warning= res.msg;
          _this.isWarning=true;
        }
      }, (res) => {
        console.log(res)
      })
    },
    save:function () {
      let _this = this
      let reg1 = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,12}$/
      if(!_this.formData.oldPassword){
        // _this.$message.error({
        //   message: '请输入密码',
        //   center: true
        // })
        _this.warning= '请输入密码！'
        _this.isWarning=true;
        return
      }
      if (_this.formData.oldPassword.length < 8) {
        // _this.$message.error({
        //   message: '请输入长度为8到12位的密码',
        //   center: true
        // })
        _this.warning= '请输入长度为8到12位的密码！'
        _this.isWarning=true;
        return
      }
      if(!reg1.test(_this.formData.oldPassword)){
        // _this.$message.error({
        //   message: '密码必须包含数字、字母、符号中两种！',
        //   center: true
        // })
        _this.warning= '密码必须包含数字、字母、符号中两种！'
        _this.isWarning=true;
        return
      }

      if(!_this.formData.password){
        // _this.$message.error({
        //   message: '请输入确认密码',
        //   center: true
        // })
        _this.warning= '请输入确认密码！',
        _this.isWarning=true;
        return
      }

      if (_this.formData.password.length < 8) {
        // _this.$message.error({
        //   message: '请输入长度为8到12位的密码',
        //   center: true
        // })
        _this.warning= '请输入长度为8到12位的密码！',
        _this.isWarning=true;
        return
      }
      if(!reg1.test(_this.formData.password)){
        // _this.$message.error({
        //   message: '密码必须包含数字、字母、符号中两种！',
        //   center: true
        // })
        _this.warning= '密码必须包含数字、字母、符号中两种！',
        _this.isWarning=true;
        return
      }
      if(_this.formData.password!==_this.formData.oldPassword){
        // _this.$message.error({
        //   message: '两次输入的密码不一致！',
        //   center: true
        // })
        _this.warning= '两次输入的密码不一致！',
        _this.isWarning=true;
        return
      }
      let password = encodeURIComponent(encodeURIComponent(_this.encryptByDES(_this.formData.password, 'DES_KEY_PASSWORD')));
      let params = {
        token: sessionStorage.getItem('token'),
        mobile: _this.formData.mobile,
        password: password,
        // msgcode: _this.formData.code,
      };
      _this.postData(_this.pwdUpdate, params, function (res) {
        console.log(res)
        if(res.code===0){
          _this.step=0;
          _this.isSuccess=true;
          _this.isWarning=false;
          localStorage.setItem('password',_this.formData.password)
          _this.$emit('nav-fun', {first:'个人中心', second:'登录密码设置', third:'设置成功', fourth:null});
        }
      })
    }
  },
  mounted(){
    this.$emit('nav-fun', {first:'个人中心', second:'登录密码设置', third:'输入手机号', fourth:null});
  },
  beforeDestroy(){
    this.$emit('nav-fun', {first:'个人中心', second:null, third:null, fourth:null});
  }
}
</script>

<style>
  @import "../mine.css";
</style>
