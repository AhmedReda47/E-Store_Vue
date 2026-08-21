<template>
  <article
    class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
  >
    <div class="aspect-[3/3] overflow-hidden bg-slate-100">
      <img
        :src="product.get_image"
        :alt="product.name"
        class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
      />
    </div>

    <div class="space-y-2 p-3">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-lg font-bold text-slate-900">
            {{ product.name }}
          </h3>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-base font-bold text-slate-900">${{ product.price }}</p>
        <button
          class="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          <router-link v-bind:to="product.get_absolute_url"
            >More Info</router-link
          >
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped></style>
