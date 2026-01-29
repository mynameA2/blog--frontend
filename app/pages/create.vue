<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";
import type { Post } from "~/types/post";

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();

const postId = route.query.id ? Number(route.query.id) : null;

const existingPost = computed<Post | undefined>(() => {
  if (!postId) {
    return undefined;
  }
  return postsStore.getPostById(postId);
});

const handleSubmit = (data: Omit<Post, "id" | "createAt">) => {
  if (existingPost.value) {
    postsStore.updatePost({
      ...existingPost.value,
      ...data,
    });
  }
  router.push("/");
};
</script>

<template>
  <section class="max-w-xl mx-auto space-y-6">
    <h2 class="text-2xl font-semibold">
      {{ existingPost ? "Edit Post" : "Create Post" }}
    </h2>
    <PostForm :initial-values="existingPost" @submit="handleSubmit" />
  </section>
</template>
