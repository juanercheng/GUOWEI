import vue from 'vue'
import "babel-polyfill"
import vuex from 'vuex'
vue.use(vuex);

export default new vuex.Store({
  debug: true,
  state:{
    token:null,
    userInfo:null,
    isEdit:false, //个人信息编辑
    isCertified:false,//申请认证
    isSearch:false,//搜索
    hasData:false,
    activeTab:null
  },
  mutations:{
    setToken(state){
      this.state.token=state
    },
    clearToken () {
      if (this.debug) console.log('clearMessageAction triggered')
      sessionStorage.removeItem('token')
      this.state.token = ''
    },
    setUpheadPortrait(d,state){
      this.state.userInfo=state
    },
    SetSaveData(d,state){
      this.state.isEdit=state
    },
    SetAuthentication(d,state){
      this.state.isCertified=state
    },
    SetSearch(d,state){
      this.state.isSearch=state
    },
    SetSearchData(d,state){
      this.state.hasData=state
    },
    SetActiveTab(d,state){
      this.state.activeTab=state
    }
  },
})

// var mutations = {}
//
// mutations[types.setToken] = (state) => {
//   this.state.token=state
// }
//
// mutations[types.setUpheadPortrait] = (d,state) => {
//   this.state.userInfo=state
// }
// mutations[types.SetSaveData] = (d,state) => {
//   this.state.isEdit=state
// }
// mutations[types.SetAuthentication] = (d,state) => {
//   this.state.isCertified=state
// }
// mutations[types.SetSearch] = (d,state) => {
//   this.state.isSearch=state
// }
// mutations[types.SetSearchData] = (d,state) => {
//   this.state.hasData=state
// }
//
// export default new Vuex.Store({
//   state: {
//     token:null,
//     userInfo:null,
//     isEdit:false, //个人信息编辑
//     isCertified:false,//申请认证
//     isSearch:false,//搜索
//     hasData:false
//   },
//   mutations: mutations
// })
