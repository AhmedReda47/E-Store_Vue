<template>
  <section class="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-5xl">
      <div
        class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8 lg:p-10"
      >
        <div
          class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600"
            >
              Account overview
            </p>
            <h1 class="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
              My Account
            </h1>
            <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage your profile, sign out, and review your recent orders from
              one place.
            </p>
          </div>

          <button
            @click="logout()"
            class="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            Log out
          </button>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <div class="mb-5 flex items-center justify-between gap-3">
            <div>
              <p
                class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Orders
              </p>
              <h2 class="mt-2 text-2xl font-bold text-slate-900">My Orders</h2>
            </div>

            <span
              class="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"
            >
              {{ orders.length }} total
            </span>
          </div>

          <div v-if="orders.length" class="space-y-5">
            <OrderSummary
              v-for="order in orders"
              :key="order.id"
              :order="order"
            />
          </div>

          <div
            v-else
            class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center"
          >
            <div
              class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600"
            >
              🛍️
            </div>
            <h3 class="text-lg font-semibold text-slate-800">No orders yet</h3>
            <p class="mt-2 text-sm text-slate-500">
              Your purchase history will appear here once you place an order.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import OrderSummary from "@/components/OrderSummary.vue";
export default {
  name: "MyAccount",
  components: {
    OrderSummary
  },
  data() {
    return {
      username: "",
      user: null,
      orders: []
    };
  },
  mounted() {
    this.getMyOrders();
  },
  methods: {
    logout() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");

      this.$store.commit("removeToken");

      this.$router.push("/");
    },
    async getMyOrders() {
      await axios
        .get("/api/v1/orders/")
        .then((response) => {
          this.orders = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    }
  }
};
</script>
