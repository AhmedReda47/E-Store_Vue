<template>
  <div class="space-y-6 sm:space-y-8">
    <section
      class="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white shadow-xl shadow-slate-900/20"
    >
      <div
        v-if="loading"
        class="w-full flex items-center justify-center rounded-2xl bg-white p-12 shadow-sm ring-1 ring-slate-200"
      >
        <!-- <div class="loading-spinner"></div> -->
      </div>
      <div
        class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:p-10"
      >
        <div class="space-y-4">
          <span
            class="inline-flex rounded-2xl bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200"
          >
            New season
          </span>
          <div class="space-y-3">
            <h1
              class="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl"
            >
              Welcome to E-Store
            </h1>
            <p class="max-w-xl text-sm text-slate-200 sm:text-base">
              Discover premium jackets for every season with modern comfort,
              clean design, and confident style.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row">
            <router-link
              to="/summer"
              class="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Shop Summer
            </router-link>
            <router-link
              to="/winter"
              class="inline-flex items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Shop Winter
            </router-link>
          </div>
        </div>

        <div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl bg-white/10 p-4">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-200">
                Best seller
              </p>
              <p class="mt-3 text-2xl font-bold">Urban Shell</p>
              <p class="mt-1 text-sm text-slate-200">Weather-ready comfort</p>
            </div>
            <div class="rounded-2xl bg-emerald-400 p-4 text-slate-900">
              <p class="text-xs uppercase tracking-[0.2em]">Offer</p>
              <p class="mt-3 text-2xl font-bold">20% off</p>
              <p class="mt-1 text-sm">on premium outerwear</p>
            </div>
            <div class="rounded-2xl bg-white p-4 text-slate-900 sm:col-span-2">
              <p class="text-sm font-semibold">Fast delivery</p>
              <p class="mt-1 text-sm text-slate-600">
                From our latest drop to your doorstep in just a few days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 sm:p-6"
    >
      <div
        class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600"
          >
            Featured
          </p>
          <h2 class="text-2xl font-bold text-slate-900">Latest Products</h2>
        </div>
        <div class="flex flex-wrap gap-2">
          <span
            class="rounded-2xl bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
            >Trending</span
          >
          <span
            class="rounded-2xl bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900"
            >New Drop</span
          >
          <span
            class="rounded-2xl bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700"
            >Top Rated</span
          >
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <productCard
          v-for="product in latestProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "@/components/ProductCard.vue";
export default {
  data() {
    return {
      latestProducts: []
    };
  },
  components: {
    ProductCard
  },
  mounted() {
    this.getLatestProducts();
    document.title = "Home | E-Store";
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true);
      await axios
        .get("/api/v1/latest-products/")
        .then((Response) => {
          this.latestProducts = Response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    }
  }
};
</script>
<style scoped>
.loading-spinner {
  width: 64px;
  height: 64px;
  border: 8px solid rgba(148, 163, 184, 0.25);
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
