<template>
  <div class="bg">
    <div class="container">
      <div class="login-box" style="padding-bottom: 0">
        <div style="font-size: 24px;margin-bottom: 13.6%">忘记密码</div>
        <div v-if="step===0">
          <div><input class="login-input"
                      required maxlength="11" v-model.trim="tel"
                      type="tel"
                      placeholder="请输入手机号"/></div>
          <div style="position: relative">
            <input class="login-input"
                   type="text" required maxlength="6"
                   v-model.trim="code"
                   placeholder="请输入验证码"/>
            <button class="getCode"
                    :disabled="getCode"
                    :style="getCode?'color:#ddd':'color:#f2693e'"
                    @click="sendCode"><span>{{codeMsg}}</span></button>
          </div>
          <div class="text-center" style="margin: 24.5% 0 15.6% 0"><button class="btn btn-active" @click="next">下一步</button></div>
          <div class="text-center" style="font-size: 18px;color: #666;padding-bottom:7.7%"><router-link to="/login"><span style="font-size: 18px;color: #666;">返回</span></router-link></div>
        </div>
        <div v-else>
          <div><input class="login-input"
                      required maxlength="6" v-model.trim="password"
                      type="password"
                      placeholder="输入新密码"/></div>
          <div><input class="login-input" type="password"
                      required maxlength="6" v-model.trim="affirmPassword"
                      placeholder="确认新密码"/></div>
          <div class="text-center" style="margin: 95px 0 61px 0"><button class="btn btn-active" @click="confirm">完成</button></div>
          <div class="text-center" style="font-size: 18px;color: #666;padding-bottom: 30px"><router-link to="/login">返回</router-link></div>
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
      pwdForgetUrl:  API.api.user.pwdForget,
      codeMsg: '获取验证码',
      getCode: false,
      tel: '',
      password: '',
      affirmPassword: '',
      code: '',
      step:0
    }
  },
  methods: {
    sendCode () {
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!vm.tel) {
        vm.$message.error({
          message: '请输入手机号码',
          center: true
        })
        return
      }
      if (!reg.test(vm.tel)) {
        vm.$message.error({
          message: '请输入正确的手机号码',
          center: true
        })
        return
      }
      // http
      let mobileEncrypt = encodeURI(vm.encryptByDES(vm.tel, 'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y'))
      let params = {
        type: 2,
        userId: '',
        mobile: vm.tel,
        mobileEncrypt: mobileEncrypt,
        driverName: 3,
        userType:2
      }
      vm.postData(vm.getMobileCodeUrl, params, function (res) {
        console.log(res)
        if (res.code === 0) {
          vm.$message({
            message: '验证码已发送',
            type: 'success'
          })
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
          vm.$message.error({
            message: res.msg,
            center: true
          })
        }
      }, (res) => {
        console.log(res)
      })
    },
    next:function(){
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!vm.tel) {
        vm.$message.error({
          message: '请输入手机号码',
          center: true
        })
        return
      }
      if (!reg.test(vm.tel)) {
        vm.$message.error({
          message: '请输入正确的手机号码',
          center: true
        })
        return
      }
      if (!vm.code) {
        vm.$message.error({
          message: '请输入验证码！',
          center: true
        })
        return
      }
      this.step=1
    },
    confirm () {
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!vm.tel) {
        vm.$message.error({
          message: '请输入手机号码！',
          center: true
        })
        return
      }
      if (!reg.test(vm.tel)) {
        vm.$message.error({
          message: '请输入正确的手机号码！',
          center: true
        })
        return
      }
      if (!vm.code) {
        vm.$message.error({
          message: '请输入验证码！',
          center: true
        })
        return
      }
      if (!vm.password) {
        vm.$message.error({
          message: '请输入密码！',
          center: true
        })
        return
      }
      if (!vm.affirmPassword) {
        vm.$message.error({
          message: '请输入密码！',
          center: true
        })
        return
      }
      if (vm.password.length < 6) {
        vm.$message.error({
          message: '请输入长度为6到10位的密码！',
          center: true
        })
        return
      }
      if (vm.affirmPassword.length < 6) {
        vm.$message.error({
          message: '请输入长度为6到10位的密码！',
          center: true
        })
        return
      }
      if (vm.password !== vm.affirmPassword) {
        vm.$message.error({
          message: '两次输入密码不一致，请重新输入！',
          center: true
        })
        return
      }
      let password = encodeURI(vm.encryptByDES(vm.password, 'DES_KEY_PASSWORD'))
      let params = {
        mobile: vm.tel,
        newPassword: password,
        msgcode: vm.code
      }
      vm.postData(vm.pwdForgetUrl, params, function (res) {
        console.log(res)
        if (res.code === 0) {
          vm.$message({
            message: '修改成功',
            type: 'success'
          })
          vm.$router.push('/login')
        } else {
          vm.$message.error({
            message: res.msg,
            center: true
          })
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
