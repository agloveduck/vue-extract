import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import EntityExtraction from '../components/EntityExtraction.vue'
import RelationExtraction from '../components/RelationExtraction.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/entity_extraction',
        name: 'EntityExtraction',
        component: EntityExtraction
    },
    {
        path: '/relation_extraction',
        name: 'RelationExtraction',
        component: RelationExtraction
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
