import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/home/dashboard'  //首页
import Login from '@/components/login/login'  //登陆
import Register from '@/components/login/register'  // 注册
import Restpsd from '@/components/login/restpsd'  //忘记密码
import About from '@/components/about/about'  //about
import NewsDetails from '@/components/news/newsDetails'
import News from '@/components/news/news'
import ExpressNew from '@/components/expressNew/expressNew'
import Column from '@/components/column/column'  //专栏
import ColumnSpecial from '@/components/column/columnSpecial'  //作者/企业专栏
import SearchList from '@/components/common/searchList'  //搜索页面
import Mine from '@/components/mine/mine'  //个人中心
import UserInfo from '@/components/mine/userInfo/userInfo'
import Authentication from '@/components/mine/authentication/authentication'
import Integral from '@/components/mine/integral/integral'
import Password from '@/components/mine/password/password'
import Article from '@/components/mine/article/article'
import ArticleDetails from '@/components/mine/article/articleDetails'
import AddArticle from '@/components/mine/article/addArticle'
import LabelList from '@/components/common/labelList'

Vue.use(Router)

export default new Router({
  linkActiveClass:'router-link-active router-link-exact-active',
  routes: [
    {
      path: '/',
      // component: Dashboard,
      redirect:'/Dashboard'
    },
    {
      path: '/Dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isFooter: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/labelList',
      name: 'labelList',
      component: LabelList
    },
    {
      path: '/restpsd',
      name: 'restpsd',
      component: Restpsd
    },
    {
      path: '/about/:titleName',
      name: 'about',
      component: About
    },
    {
      path: '/newsDetails',
      name: 'newsDetails',
      component: NewsDetails
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/expressNew',
      name: 'expressNew',
      component: ExpressNew
    },
    {
      path: '/column',
      name: 'column',
      component: Column
    },
    {
      path: '/columnSpecial',
      name: 'columnSpecial',
      component: ColumnSpecial
    },
    {
      path: '/searchList',
      name: 'searchList',
      component: SearchList
    },
    {
      path: '/mine',
      name: 'mine',
      redirect:'/mine',
      meta: {
        requireAuth: true,
      },
      component: Mine,
      children:[
        {
          path: '/mine',
          component: UserInfo
        },
        { path: '/mine/userInfo',
          component: UserInfo,
          beforeRouteLeave (to, from, next) {
            console.log('this.$store.state.isEdit',this.$store.state.isEdit)
            next('/0')
          }
        },
        { path: '/mine/authentication',
          component: Authentication,
        },
        { path: '/mine/integral',
          component: Integral,
        },
        { path: '/mine/password',
          component: Password,
        },
        { path: '/mine/article',
          component: Article,
        },
        { path: '/mine/articleDetails',
          component: ArticleDetails,
        },
        { path: '/mine/addArticle',
          component: AddArticle,
        },
      ]
    },

  ]
})
