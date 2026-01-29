<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { usePostsStore } from "~/stores/posts";

const postsStore = usePostsStore();

onMounted(() => {
  postsStore.hydrate();
});
</script>
