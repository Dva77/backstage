import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import first from '../components/first.vue'
import help from '../components/help.vue'
import trends from '../components/trends.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    {
        path: '/home',
        component: home,
        // redirect: '/form',
        children: [
            { path: '/first', component: first },
            { path: '/help', component: help },  
            { path: '/trends', component: trends },   
        ]
    },
]

const router = new VueRouter({
  routes
})

export default router
