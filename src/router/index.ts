import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/LoginView.vue')
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router