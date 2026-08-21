<template>
  <section>
    <div class="page-category space-y-6">
      <h1 class="text-2xl font-bold text-slate-900 capitalize text-center">
        {{ category.name }} Collection
      </h1>
      <section class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ProductCard
          v-for="product in category.products"
          :key="product.id"
          :product="product"
        />
      </section>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";
export default {
  name: "Category",
  components: {
    ProductCard
  },

  data() {
    return {
      category: {
        products: []
      }
    };
  },

  watch: {
    "$route.params.category_slug": {
      immediate: true,
      handler() {
        this.getCategory();
      }
    }
  },

  methods: {
    async getCategory() {
      const categorySlug = this.$route.params.category_slug;

      this.$store.commit("setLoading", true);

      axios
        .get(`/api/v1/products/${categorySlug}/`)
        .then((response) => {
          this.category = response.data;
          document.title = this.category.name + " | E-Store";
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          this.$store.commit("setLoading", false);
        });
    }
  }
};
</script>
