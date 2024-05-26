import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../view/LoginView.vue')
    },
    {
        path: '/main',
        component: () => import('../view/MainView.vue'),
        children: [
            {
                path: 'course',
                component: () => import('../pages/CoursePage.vue')
            },
            {
                path: 'reservation',
                component: () => import('../pages/ReservationPage.vue')
            },
            {
                path: 'admin',
                component: () => import('../pages/AdminPage.vue')
            },
            {
                path: '',
                component: () => import('../pages/ReservationPage.vue')
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router