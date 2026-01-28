import { defineStore } from 'pinia'
import type { Post } from '~/types/post'

export const usePostsStore = defineStore('posts', () => {
    const posts = ref<Post[]>([])

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

    return { posts, addPost, deletePost, updatePost, getPostById }
})