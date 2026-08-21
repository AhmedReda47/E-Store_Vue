<template>
  <nav class="sticky top-0 z-50 mx-auto max-w-6xl px-4 py-3">
    <div
      class="mx-auto hidden max-w-6xl items-center justify-between gap-4 rounded-2xl bg-slate-950 px-4 py-3 backdrop-blur-xl md:flex"
    >
      <router-link
        to="/"
        class="group flex items-center gap-3 rounded-2xl bg-slate-950/80 px-3 py-2 text-white transition hover:bg-white/10"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400 text-sm font-black text-slate-950"
        >
          <i class="fas fa-shopping-cart"></i>
        </span>
        <span class="text-lg font-extrabold tracking-tight">E-Store</span>
      </router-link>

      <div class="flex-1 px-4">
        <form @submit.prevent="onSearch" class="relative">
          <label for="header-search" class="sr-only">Search products</label>
          <input
            id="header-search"
            v-model="searchQuery"
            type="search"
            name="query"
            class="w-full rounded-full bg-slate-900/60 border border-white/10 py-2 pl-10 pr-20 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="What are you looking for?"
            aria-label="Search products"
          />
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <i class="fas fa-search"></i>
          </span>
          <button
            type="submit"
            class="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-emerald-500 px-3 py-1.5 text-white text-sm hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Search
          </button>
        </form>
      </div>

      <div
        class="flex items-center gap-2 rounded-2xl border border-white/10 bg-transparent px-2 py-1.5"
      >
        <router-link
          to="/summer"
          class="rounded-2xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Summer
        </router-link>
        <router-link
          to="/winter"
          class="rounded-2xl px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Winter
        </router-link>

        <div class="ml-1 flex items-center gap-2 border-l border-white/10 pl-2">
          <template v-if="$store.state.isAuthenticated">
            <router-link
              to="/my-account"
              class="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 hover:text-emerald-300"
            >
              My Account
            </router-link>
          </template>
          <template v-else>
            <router-link
              to="/log-in"
              class="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Log in
            </router-link>
          </template>
          <router-link
            to="/cart"
            class="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
          >
            Cart ({{ cartTotalLength }})
          </router-link>
        </div>
      </div>
    </div>

    <div
      class="border-b border-white/10 rounded-2xl bg-slate-950 px-3.5 py-3 md:hidden"
    >
      <div class="mx-auto flex max-w-lg items-center justify-between gap-2">
        <router-link to="/" class="flex items-center gap-2 text-white">
          <span
            class="flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-400 text-xs font-black text-slate-950"
          >
            <i class="fas fa-shopping-cart"></i>
          </span>
          <span class="text-sm font-extrabold tracking-tight">E-Store</span>
        </router-link>

        <div class="flex items-center gap-2">
          <router-link
            to="/cart"
            class="rounded-2xl bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30"
          >
            Cart ({{ cartTotalLength }})
          </router-link>
          <button
            @click="mobileOpen = !mobileOpen"
            :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
            class="h-9 w-9 rounded-2xl bg-transparent text-slate-200 transition hover:bg-white/10"
          >
            <i :class="['fas', mobileOpen ? 'fa-times' : 'fa-bars']"></i>
          </button>
        </div>
      </div>
    </div>
    <transition name="fade-slide">
      <div
        v-if="mobileOpen"
        class="mt-3 max-w-lg mx-auto rounded-2xl bg-slate-950 border border-white/10 p-3"
      >
        <form @submit.prevent="onSearch" class="mb-3 flex items-center gap-2">
          <input
            v-model="searchQuery"
            type="search"
            name="query"
            placeholder="Search products"
            class="flex-1 rounded-lg bg-slate-900/60 border border-white/10 py-2 px-3 text-sm text-slate-200 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            class="rounded-lg bg-emerald-500 px-3 py-2 text-sm text-white"
          >
            Go
          </button>
        </form>

        <router-link
          to="/summer"
          class="block rounded px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Summer
        </router-link>
        <router-link
          to="/winter"
          class="mt-1 block rounded px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Winter
        </router-link>

        <div class="mt-3 flex flex-col gap-2">
          <template v-if="$store.state.isAuthenticated">
            <router-link
              to="/my-account"
              class="block rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/20 hover:text-emerald-300"
            >
              My Account
            </router-link>
          </template>
          <template v-else>
            <router-link
              to="/log-in"
              class="block rounded-2xl bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Log in
            </router-link>
          </template>
        </div>
      </div>
    </transition>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      cart: {
        items: []
      },
      mobileOpen: false,
      searchQuery: ""
    };
  },
  beforeCreate() {
    this.$store.commit("initializeStore");
  },
  mounted() {
    this.cart = this.$store.state.cart;
  },
  methods: {
    onSearch() {
      if (!this.searchQuery) return;
      this.$router.push({
        path: "/search",
        query: { query: this.searchQuery }
      });
      this.searchQuery = "";
      this.mobileOpen = false;
    }
  },
  computed: {
    cartTotalLength() {
      let totalLength = 0;
      for (let i = 0; i < this.cart.items.length; i++) {
        totalLength += this.cart.items[i].quantity;
      }
      return totalLength;
    }
  }
};
</script>
