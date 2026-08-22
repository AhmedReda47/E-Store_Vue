<template>
  <section
    class="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10"
  >
    <div
      class="w-full max-w-xl rounded-[28px] border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-100/60 sm:p-10"
    >
      <div
        class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl shadow-inner shadow-emerald-200/60"
      >
        ✅
      </div>

      <p
        class="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600"
      >
        Order placed
      </p>
      <h1 class="mt-4 text-4xl font-black text-slate-900">Thank You!</h1>
      <p class="mt-4 text-base leading-7 text-slate-600">
        Your order has been received and will be processed within 48 hours.
      </p>

      <div class="mt-8 space-y-3 rounded-2xl bg-slate-50 p-5 text-left">
        <div class="flex items-center justify-between text-sm text-slate-600">
          <span>Status</span>
          <span class="font-semibold text-emerald-600">Confirmed</span>
        </div>
        <div class="flex items-center justify-between text-sm text-slate-600">
          <span>Delivery</span>
          <span class="font-semibold text-slate-800">2–5 business days</span>
        </div>
      </div>

      <router-link
        to="/"
        class="mt-8 inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Continue shopping
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "Success",
  mounted() {
    document.title = "Success | E-Store";
    this.$store.commit("clearCart");
  }
};
</script>
