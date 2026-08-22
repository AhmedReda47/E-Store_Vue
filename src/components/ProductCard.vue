<template>
  <article
    class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
  >
    <router-link
      :to="product.get_absolute_url"
      class="block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/60 focus-visible:ring-offset-2"
    >
      <div class="aspect-[4/4] overflow-hidden bg-slate-100">
        <img
          :src="product.get_image"
          :alt="product.name"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div class="space-y-3 p-4">
        <div class="flex items-start justify-between gap-3">
          <h3
            class="text-lg font-semibold text-slate-900 transition-colors group-hover:text-slate-700"
          >
            {{ product.name }}
          </h3>
        </div>

        <div class="flex items-center justify-between gap-3">
          <p class="text-lg font-bold text-slate-900">${{ product.price }}</p>

          <span
            class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-1 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-700 hover:shadow-md"
          >
            More Info
            <span aria-hidden="true" class="text-base">→</span>
          </span>
        </div>
      </div>
    </router-link>
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
