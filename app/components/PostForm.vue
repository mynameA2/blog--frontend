<script setup lang="ts">
import type { Post } from "~/types/post";
import { Form, Field, ErrorMessage, FormContextKey } from "vee-validate";
import * as yup from "yup";

const props = defineProps<{
    initialValues?: Partial<Post>;
}>();

const emit = defineEmits<{
    (e: "submit", post: Omit<Post, "id">): void;
}>();

const schema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .max(12, "Title must be at most 12 characters"),
    description: yup
        .string()
        .required('Description is required')
        .max(50, "Description must be at most 50 characters"),
});

const onSubmit = (values: { title: string; description: string }) => {
    emit("submit", values);
};

</script>

<template>
  <Form
    :key="JSON.stringify(initialValues)"
    :validation-schema="schema"
    :initial-values="initialValues"
    @submit="onSubmit"
    class="space-y-4"
  >
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <Field name="title" type="text" class="w-full rounded-md bg-gray-400 border px-3 py-2" />
      <ErrorMessage name="title" class="text-red-600 text-sm" />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <Field
        name="description"
        as="textarea"
        rows="4"
        class="w-full rounded-md bg-gray-400 border px-3 py-2"
      />
      <ErrorMessage name="description" class="text-red-600 text-sm" />
    </div>

    <button
      type="submit"
      class="rounded-md bg-black px-4 py-2 text-white hover:opacity-80"
    >
      Submit
    </button>
  </Form>
</template>
