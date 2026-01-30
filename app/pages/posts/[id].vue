<script lang="ts">
import { usePostsStore } from "~/stores/posts";

const route = useRoute();
const router = useRouter();
const postsStore = usePostsStore();
const postId = Numder(route.params.id);
const post = computed(() => postsStore.getPostById(postId));
const goBack = () => {
  router.push("/");
};

watchEffect(() => {
  if (!post.value) {
    console.log("Post not found");
  }
});
</script>

<template>
  <section class="max-w-2x1 mx-auto space-y-6">
    <button class="text-sm text-gray-500 hover:underline" @click="goBack">Go Back</button>

    <div v-if="!post" class="text-center text-gray-500">Post not found</div>

    <article v-else class="space-y-4">
      <h1 class="text-3xl font-bold">
        {{ post.title }}
      </h1>

      <p class="text-gray-700">
        {{ post.description }}
      </p>

      <div class="flex gap-4 pt-4">
        <NuxtLink
          :to="`/create?id=$(post.id)`"
          class="rounded-md border px-4 py-2 hover:bg-gray-100"
        >
          Edit
        </NuxtLink>

        <button
          class="rounded-md border px-4 py-2 text-red-600 hover:bg-gray-100"
          @click="
            postsStore.deletePost(post.id);
            goBack();
          "
        >
          Delete
        </button>
      </div>
    </article>
  </section>
</template>
