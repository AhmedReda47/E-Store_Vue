<template>
  <section>
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section
        class="rounded-3xl border border-slate-700/50 bg-slate-950 p-6 shadow-xl shadow-slate-950/30"
      >
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p class="text-sm uppercase tracking-[0.3em] text-emerald-400">
              Search
            </p>
            <h1 class="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Find your perfect product
            </h1>
            <p class="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Browse products that match your search term and discover the best
              styles for any season.
            </p>
          </div>
          <div class="rounded-2xl bg-slate-900/80 p-4 ring-1 ring-white/10">
            <p class="text-xs uppercase tracking-[0.24em] text-slate-400">
              Current query
            </p>
            <p class="mt-2 text-lg font-semibold text-white">
              "{{ query || "No query entered" }}"
            </p>
            <p class="mt-1 text-sm text-slate-400">{{ resultMessage }}</p>
          </div>
        </div>
      </section>

      <div class="mt-8">
        <div
          v-if="loading"
          class="rounded-3xl border border-slate-700/50 bg-slate-950 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20"
        >
          <div
            class="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/10"
          >
            <i class="fas fa-spinner fa-pulse text-emerald-400"></i>
          </div>
          <p class="mt-4 text-base">Searching products…</p>
        </div>

        <div
          v-else-if="!query"
          class="rounded-3xl border border-slate-700/50 bg-slate-950 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20"
        >
          <p class="text-xl font-semibold text-white">
            No search query provided.
          </p>
          <p class="mt-2 text-sm text-slate-400">
            Use the search box in the header to find jackets, coats, and
            seasonal favorites.
          </p>
        </div>

        <div
          v-else-if="products.length === 0"
          class="rounded-3xl border border-slate-700/50 bg-slate-950 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/20"
        >
          <p class="text-xl font-semibold text-white">
            No results for "{{ query }}"
          </p>
          <p class="mt-2 text-sm text-slate-400">
            Try a different keyword or browse the latest collections instead.
          </p>
        </div>

        <div v-else class="grid gap-6 lg:grid-cols-3">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "Search",
  components: {
    ProductCard
  },
  data() {
    return {
      products: [],
      query: "",
      loading: false
    };
  },
  computed: {
    resultMessage() {
      if (!this.query) {
        return "Enter a search term above to get started.";
      }
      if (this.products.length === 0) {
        return "No matches found for this term.";
      }
      return `${this.products.length} product${
        this.products.length === 1 ? "" : "s"
      } found.`;
    }
  },
  mounted() {
    document.title = "Search | E-Store";
    this.setQueryFromRoute();
  },
  watch: {
    "$route.query.query"(newQuery) {
      this.query = newQuery || "";
      if (this.query) {
        this.performSearch();
      } else {
        this.products = [];
      }
    }
  },
  methods: {
    setQueryFromRoute() {
      this.query = this.$route?.query?.query || "";
      if (this.query) {
        this.performSearch();
      }
    },
    async performSearch() {
      if (!this.query) {
        this.products = [];
        return;
      }

      this.loading = true;
      this.$store.commit("setIsLoading", true);

      try {
        const response = await axios.post("/api/v1/products/search/", {
          query: this.query
        });
        this.products = response.data || [];
      } catch (error) {
        console.error("Search request failed", error);
        this.products = [];
      } finally {
        this.loading = false;
        this.$store.commit("setIsLoading", false);
      }
    }
  }
};
</script>
