import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lazyout from '../views/layout/Layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    // 登录
    path: '/signin',
    name: 'Signin',
    component: () => import('../views/signin/Signin.vue'),
    meta: {
      title: '登录'
    }
  }, {
    // 注册
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/lianxi',
    name: 'Lianxi',
    component: () => import('../components/lianxi/Lianxi.vue'),
    meta: {
      title: 'practice'
    }
  },
  {
    path: '',
    component: Lazyout,//父路由
    children: [
      // 首页
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页',
          index: '/',  //页面刷新时，使导航栏保持高亮效果
        }
      },
      // 已发布
      {
        path: '/release',
        name: 'Release',
        component: () => import('../views/release/Release.vue'),
        meta: {
          title: '发布',
          index: '/release'

        }
      },
      //  详情 (已发布里面可以点开查看详情)
      {
        path: '/details',
        name: 'Details',
        component: () => import('../views/details/Details.vue'),
        meta: {
          title: '详情',
          index: '/release'   //详
        }
      },
      //已发布里面 编辑
      {
        path: '/edit',
        name: 'edit',
        component: () => import('../views/edit/Edit.vue'),
        meta: {
          title: '编辑',
          index: '/release'
        }
      },
      //统计 
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('../views/statistics/Statistics.vue'),
        meta: {
          title: '统计',
          index: '/statistics'
        }
      },
      // 发表文章
      {
        path: '/article',
        name: 'Article',
        component: () => import('../views/article/Article.vue'),
        meta: {
          title: '发表文章',
          index: '/article'
        }
      },
      // 标签页
      {
        path: '/tab',
        name: 'Tab',
        component: () => import('../views/tab/Tab.vue'),
        meta: {
          title: '标签页',
          index: '/tab'
        }
      },
      // 导出 表格
      {
        path: '/export',
        name: 'Export',
        component: () => import('../views/export/Export.vue'),
        meta: {
          title: '导出excel',
          index: '/export'
        }
      },
      // 图片上传
      {
        path: '/picture',
        name: 'Picture',
        component: () => import('../views/picture/Picture.vue'),
        meta: {
          title: '图片上传',
          index: '/picture'
        }
      },
      // 退出
      {
        path: '/out',
        name: 'Out',
        component: () => import('../views/out/Out.vue'),
        meta: {
          title: '退出 ',
          index: '/out'

        }
      },


      {
        path: '*',
        component: () => import('../views/404/404.vue')

      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//r如果当前用户没有登录或注册，就只能访问登录注册页面
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  let user = localStorage.getItem('username')//先获取储存的值 如果储存了
  // console.log(user);
  // if (user) { //如果储存的有值，表示用户已经登录,如果已经登录就直接下一步操作
  //   next()
  // } else { //没有储存值，就没有登录， 再判断是否在登录页面，在就直接下一步，没在就调登录
  //   if (to.path === '/signin') {
  //     next()
  //   } else {
  //     next('/signin')
  //   }
  // }
  if (to.path === '/signin') {
    next()
  } else {
    user ? next() : next('/signin')
  }
})
export default router
