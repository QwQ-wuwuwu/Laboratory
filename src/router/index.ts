import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/LoginView.vue')
    },
    {
        path: '/main',
        component: () => import('../view/MainView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router