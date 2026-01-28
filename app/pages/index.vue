<template> 
    <section class="max-w-3x1 mx-auto space-y-6">
        <div class="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <h2 class="text-2xl font-semibold">Posts</h2>

            <NuxtLink
                to="/create"
                class="inline-flex justify-center rounded-md bg-blsck px-4 py-2 text-white hover:opacity-80"
            >
                Create Post
            </NuxtLink>
        </div>

        <input 
            v-model="search" 
            type="text" 
            placeholder="search"
            class="bg-gray-500 w-full rounded-md border px-3 py-2"
        />

        <p v-if="!filteredPosts.length" class="text-gray-500 text-center">
            No posts found.
        </p>

        <ul class="space-y-4">
            <li v-for="post in filteredPosts" :key="post.id">
                <PostCard :post="post" @delete="handleDelete" />
            </li>
        </ul>

    </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostsStore } from '~/stores/posts'

const postsStore = usePostsStore()
const { posts } = storeToRefs(postsStore)

const search = ref('')

const filteredPosts = computed(() => {
    if (!search.value) {
        return posts.value
    }

    return posts.value.filter((post) => {
        return post.title.toLowerCase().includes(search.value.toLowerCase())
    })
})

const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this post?')
    if (confirmed) {
        postsStore.deletePost(id)
    }
}

</script>
