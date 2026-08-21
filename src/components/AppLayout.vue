<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900"
    style="font-family: 'Roboto', sans-serif"
  >
    <AppHeader />
    <div
      class="is-loading-bar w-fit mx-auto"
      v-bind:class="{ 'is-loading': $store.state.isLoading }"
    >
      <div class="loading-bar-content"></div>
    </div>
    <main class="mx-auto max-w-6xl px-4 py-6 pb-24 md:pb-6">
      <router-view />
    </main>

    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./AppHeader.vue";
import AppFooter from "./AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter
  }
};
</script>
<style>
.loading-bar-content {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.loading-bar-content:after {
  content: "";
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin: 8px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #10b981 transparent #10b981 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.is-loading-bar {
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
}

.is-loading-bar.is-loading {
  height: 80px;
}
</style>
