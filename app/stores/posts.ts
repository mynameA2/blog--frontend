import { defineStore } from 'pinia'
import type { Post } from '~/types/post'

const STORAGE_KEY = 'posts'

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<Post[]>([])

    const hydrate = () => {
        if(process.server) return

        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            posts.value = JSON.parse(raw)
            }   
    }
    const persist = () => {
        if (process.server) return
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts.value))
    }

    watch(posts, persist, { deep: true })

const addPost = (post: Post) => {
    posts.value.push(post)
}

const deletePost = (id: number) => {
    posts.value = posts.value.filter(post => post.id !== id)
}

const updatePost = (updates: Post) => {
    const index = posts.value.findIndex(p => p.id === updates.id)
    if (index !== -1) {
        posts.value[index] = updates
    }
}

const getPostById = (id: number) => {
    return posts.value.find(post => post.id === id)
}

return { posts, hydrate, addPost, deletePost, updatePost, getPostById }
})