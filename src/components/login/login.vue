<template>
 <div class="bg">
   <div class="container">
     <div class="login-box">
       <div style="font-size: 24px;margin-bottom: 15.12%">登录</div>
       <div>
         <div class="warning" v-show="isWarning">
           {{warning}}
         </div>
         <div>
           <input class="login-input"
                      maxlength="11" v-model.trim="formData.mobile"
                     type="tel"
                     placeholder="请输入手机号"/>
         </div>
         <div>
           <input
           class="login-input" type="password"
            maxlength="12" v-model.trim="formData.password"
           placeholder="请输入密码"/>
         </div>
       </div>
       <div class="flex-row justify-between"
            style="font-size: 18px;color: #999;margin-bottom: 20.7%">
         <div style="display: flex;align-items: center;font-size: 16px">
           <img :src="checked?require('../../assets/images/checked.png'):require('../../assets/images/checkbox-unchecked.png')"
              style="width: 15px;height: 15px;margin-right: 9px" @click="check"/>
           记住密码
         </div>
       <div style="font-size: 16px"><router-link to="/restpsd">忘记密码?</router-link></div>
       </div>
       <div class="flex-row justify-between">
         <button class="btn btn-active" @click="confirm">登录</button>
         <router-link to="/register"><span class="goregister">去注册</span></router-link>
       </div>
       <div class="text-center" style="margin: 15% 0 7.7% 0"><router-link to="/"><span style="font-size: 18px;color: #666;">暂不登录</span></router-link></div>
     </div>
   </div>
 </div>
</template>
<script type="text/ecmascript-6">
import API from '../../assets/js/api'
export default {
  name: 'login',
  data () {
    return {
      url: API.api.user.login,
      checked:true,
      img:require('../../assets/images/mine/touxiang.png'),
      formData: {
        mobile: localStorage.getItem('mobile')||null,
        password: localStorage.getItem('password')||null,
      },
      password:localStorage.getItem('password')||null,
      warning:'请输入手机号！',
      isWarning:false
    }
  },
  watch:{
    'formData.password':function(val,oldval){
      val = encodeURIComponent(encodeURIComponent(this.encryptByDES(val, 'DES_KEY_PASSWORD')));
      this.password = val
    },//
  },
  methods: {
    check:function(){
      this.checked=!this.checked
    },
    confirm () {
      let vm = this
      let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (!vm.formData.mobile) {
        // vm.$message.error({
        //   message: '请输入手机号码',
        //   center: true
        // })
        vm.warning='请输入手机号码！'
        vm.isWarning=true;
        return
      }
      if (!reg.test(vm.formData.mobile)) {
        // vm.$message.error({
        //   message: '请输入正确的手机号码',
        //   center: true
        // })
        vm.warning='请输入正确的手机号码！'
        vm.isWarning=true;
        return
      }
      if (!vm.formData.password) {
        // vm.$message.error({
        //   message: '请输入密码',
        //   center: true
        // })
        vm.warning='请输入密码！'
        vm.isWarning=true;
        return
      }
      if (vm.formData.password.length < 6) {
        // vm.$message.error({
        //   message: '请输入长度为6到10位的密码',
        //   center: true
        // })
        vm.warning='请输入长度为6到10位的密码！'
        vm.isWarning=true;
        return
      }
      let password = vm.password
      // encodeURI(vm.encryptByDES(vm.formData.password, 'DES_KEY_PASSWORD'))
      // http
      let params = {
        mobile: vm.formData.mobile,
        password: password,
        userType:2
      }

      vm.postData(vm.url, params, function (res) {
        console.log(res)
        if(res.code===0){
          let data = res.object
          vm.isWarning=false;
          sessionStorage.setItem('token',data.token)
          sessionStorage.setItem('userid',data.id)
          data.headPortrait=data.headPortrait?data.headPortrait:vm.img;
          sessionStorage.setItem('headPortrait',data.headPortrait);
          vm.$store.commit('setUpheadPortrait',data.headPortrait)
          if(vm.checked){
            localStorage.setItem('mobile',vm.formData.mobile);
            localStorage.setItem('password',password)
          }else {
            localStorage.removeItem('mobile');
            localStorage.removeItem('password')
          }
          vm.$store.commit('setToken',sessionStorage.getItem('token'));
          vm.$router.push({
            path: '/Dashboard',
          });
          console.log(vm.$route.query.redirect)
          // vm.$router.push(vm.$route.query.redirect);
          vm.$emit('is-login',sessionStorage.getItem('token'))
        }else {
          // vm.$message.error({
          //   message: res.msg,
          //   center: true
          // })
          vm.warning= res.msg,
          vm.isWarning=true;
        }
      })
    }
  },
  mounted () {
    this.$emit('is-footer', false)
    console.log(this.password )
  },

}
</script>

<style>
  @import "./login.css";
</style>
