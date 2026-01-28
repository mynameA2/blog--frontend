<script setup lang="ts">
import type { Post } from '~/types/post'

defineProps<{
    post: Post
}>()

const emit = defineEmits<{
    (e: 'delete', id: number): void
}>()
</script>

<template>
    <div class="rounded-lg border p-4 space-y-2">
        <NuxtLink
            :to="`/posts/${post.id}`"
            class="text-lg font-semibold hover:underline"
        >
            {{ post.title }}
        </NuxtLink>
        <p class="text-gray-500">
            {{ post.description }}
        </p>
       
        <div class="flex gap-3 pt-2">
            <NuxtLink
                :to="`/create?id=$(post.id)`"
                class="text-sm text-blue-600 hover:underline"
            >
                Edit
            </NuxtLink>
            <button
                class="text-sm text-red-600 hover:underline"
                @click="emit('delete', post.id)"
            >
                Delete
            </button>
        </div>
    </div>
</template>