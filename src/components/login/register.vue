<template>
  <div class="bg">
    <div class="container">
      <div class="login-box" style="padding-bottom: 0">
        <div style="font-size: 24px;margin-bottom: 12.3%">注册</div>
        <div>
          <div class="warning" v-show="isWarning">
            {{warning}}
          </div>
          <div><input class="login-input"
                       maxlength="11" v-model.trim="tel"
                      type="tel"
                      placeholder="请输入手机号"/></div>
          <div style="position: relative">
            <input class="login-input" v-model.trim="code"
                   maxlength="6"
                   placeholder="请输入验证码"/>
            <button class="getCode"
                    :disabled="getCode"
                    :style="getCode?'color:#ddd':'color:#f2693e'"
                    @click="sendCode"><span>{{codeMsg}}</span></button>
          </div>
        </div>
        <div><input class="login-input" type="password"
                     maxlength="12"  v-model.trim="password"
                    placeholder="输入密码"/></div>
        <div><input class="login-input" type="password"
                     maxlength="12"   v-model.trim="affirmPassword"
                    placeholder="确认密码"/></div>
        <div class="flex-row justify-between" style="margin: 6.92% 0 0px 0;padding-bottom: 12%">
          <button class="btn btn-active" @click="confirm">注册</button>
          <router-link to="/login"><span class="goregister">去登录</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import API from '../../assets/js/api'
export default {
  name: 'register',
  data () {
    return {
      getMobileCodeUrl: API.api.user.getMobileCode,
      registerUrl: API.api.user.register,
      codeMsg: '获取验证码',
      getCode: false,
      tel: '',
      password: '',
      affirmPassword: '',
      code: '',
      warning:'请输入手机号！',
      isWarning:false
    }
  },
  methods: {
    sendCode () {
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!vm.tel) {
        // vm.$message.error({
        //   message: '请输入手机号码',
        //   center: true
        // })
        vm.warning='请输入手机号码！',
        vm.isWarning=true;
        return
      }
      if (!reg.test(vm.tel)) {
        // vm.$message.error({
        //   message: '请输入正确的手机号码',
        //   center: true
        // })
        vm.warning='请输入正确的手机号码！',
        vm.isWarning=true;
        return
      }
      // http
      var mobileEncrypt =encodeURIComponent(encodeURIComponent(vm.encryptByDES(vm.tel, 'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y')))
      // let mobileEncrypt = encode(vm.encryptByDES(vm.tel, 'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y'))
      let params = {
        type: 1,
        mobile: vm.tel,
        mobileEncrypt: mobileEncrypt,
        driverName: 3,
        userId:'',
        userType:21
      }
      console.log(mobileEncrypt)
      vm.postData(vm.getMobileCodeUrl, params, function (res) {
        console.log(res)
        if (res.code === 0) {
          vm.$message({
            message: '验证码已发送',
            type: 'success'
          })
          vm.isWarning=false;
          let i
          i = 60
          let timer = setInterval(function () {
            i = i - 1
            vm.codeMsg = i + 's'
            vm.getCode = true
            if (i === 0) {
              clearInterval(timer)
              vm.getCode = false
              vm.codeMsg = '获取验证码'
            }
          }, 1000)
        } else {
          // vm.$message.error({
          //   message: res.msg,
          //   center: true
          // })
          vm.warning= res.msg,
          vm.isWarning=true;
        }
      }, (res) => {
        console.log(res)
      })
    },
    confirm () {
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      let reg1 = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{8,12}$/
      if (!vm.tel) {
        // vm.$message.error({
        //   message: '请输入手机号码！',
        //   center: true
        // })
        vm.warning='请输入手机号码！',
        vm.isWarning=true;
        return
      }
      if (!reg.test(vm.tel)) {
        vm.warning='请输入正确的手机号码！',
        vm.isWarning=true;
        // vm.$message.error({
        //   message: '请输入正确的手机号码！',
        //   center: true
        // })
        return
      }
      if (!vm.code) {
        // vm.$message.error({
        //   message: '请输入验证码！',
        //   center: true
        // })
        vm.warning='请输入验证码！',
        vm.isWarning=true;
        return
      }
      //判断验证码是否为数字
      if( /^\d+$/.test(vm.code)===false){
        // vm.$message.error({
        //   message: '验证码不是数字，请重新输入',
        //   center: true
        // })
        vm.warning='验证码必须是数字！',
        vm.isWarning=true;
        return
      }
      if (!vm.password) {
        // vm.$message.error({
        //   message: '请输入密码！',
        //   center: true
        // })
        vm.warning='请输入密码！',
        vm.isWarning=true;
        return
      }
      if (vm.password.length < 8) {
        // vm.$message.error({
        //   message: '请输入长度为8到12位的密码！',
        //   center: true
        // })
        vm.warning='请输入长度为8到12位的密码！',
        vm.isWarning=true;
        return
      }
      if(!reg1.test(vm.password)){
        // vm.$message.error({
        //   message: '密码必须包含数字、字母、符号中两种！',
        //   center: true
        // })
        vm.warning='密码必须包含数字、字母、符号中两种！',
        vm.isWarning=true;
        return
      }

      if (!vm.affirmPassword) {
        // vm.$message.error({
        //   message: '请输入确认密码！',
        //   center: true
        // })
        vm.warning='请输入确认密码！',
        vm.isWarning=true;
        return
      }
      if(!reg1.test(vm.affirmPassword)){
        // vm.$message.error({
        //   message: '确认密码必须包含数字、字母、符号中两种！',
        //   center: true
        // })
        vm.warning='密码必须包含数字、字母、符号中两种！',
        vm.isWarning=true;
        return
      }
      if (vm.password !== vm.affirmPassword) {
        // vm.$message.error({
        //   message: '两次输入密码不一致，请重新输入！',
        //   center: true
        // })
        vm.warning='两次输入密码不一致，请重新输入！',
        vm.isWarning=true;
        return
      }
      // vm.password = encodeURI(vm.encryptByDES(vm.password, 'DES_KEY_PASSWORD'))
      // vm.affirmPassword = encodeURI(vm.encryptByDES(vm.affirmPassword, 'DES_KEY_PASSWORD'))
      // password = encodeURIComponent(encryptByDES(password, 'DES_KEY_PASSWORD'));

      // let password = encodeURI(vm.encryptByDES(vm.password, 'DES_KEY_PASSWORD'))
      let password = encodeURIComponent(encodeURIComponent(vm.encryptByDES(vm.password, 'DES_KEY_PASSWORD')));
      let params = {
        mobile: vm.tel,
        password: password,
        // affirmPassword: vm.affirmPassword,
        msgcode: vm.code,
        userType:2
      }
      vm.postData(vm.registerUrl, params, function (res) {
        console.log(res)
        if (res.code === 0) {
          vm.isWarning=false;
          vm.$message({
            message: '注册成功',
            type: 'success'
          })
          vm.$router.push('/login')
        } else {
          // vm.$message.error({
          //   message: res.msg,
          //   center: true
          // })
          vm.warning= res.msg,
          vm.isWarning=true;
        }
      }, (res) => {
        console.log(res)
      })
    }
  },
  mounted () {
    this.$emit('is-footer', false)
  }
}
</script>

<style>
  @import "./login.css";
</style>
