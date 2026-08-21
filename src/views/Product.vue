<template>
  <section>
    <div class="space-y-6">
      <div
        v-if="loading"
        class="mx-auto w-full flex items-center justify-center rounded-2xl bg-white p-12 shadow-sm ring-1 ring-slate-200"
      >
        <!-- <div class="loading-spinner"></div> -->
      </div>

      <div
        v-else-if="error"
        class="rounded-2xl bg-rose-50 p-6 text-rose-700 shadow-sm ring-1 ring-rose-200"
      >
        <p class="font-semibold">Unable to load this product.</p>
        <p class="text-sm">{{ error }}</p>
      </div>

      <div v-else class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section
          class="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
        >
          <div class="aspect-[4/5] bg-slate-100">
            <img
              v-if="product.get_image"
              :src="product.get_image"
              :alt="product.name"
              class="h-full w-full object-cover"
            />
          </div>
        </section>

        <section
          class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
        >
          <div class="space-y-4">
            <div class="space-y-2">
              <span
                class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700"
              >
                Product details
              </span>
              <h1 class="text-3xl font-black text-slate-900 sm:text-4xl">
                {{ product.name }}
              </h1>
              <p
                class="text-base leading-7 text-slate-600 break-words whitespace-normal"
              >
                {{ product.description }}
              </p>
            </div>

            <div class="rounded-2xl bg-slate-50 p-4">
              <p class="text-sm text-slate-500">Price</p>
              <p class="mt-1 text-3xl font-black text-slate-900">
                ${{ product.price }}
              </p>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label
                class="flex items-center gap-3 text-sm font-semibold text-slate-700"
              >
                Quantity
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                  class="w-24 rounded-xl border border-slate-300 px-3 py-2 text-center outline-none ring-0 transition focus:border-emerald-500"
                />
              </label>

              <button
                @click="addToCart"
                type="button"
                class="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <Popup
      :show="showSuccessMessage"
      :message="`${this.addProductName} was added to the cart successfully.`"
      type="success"
    />
  </section>
</template>

<script>
import axios from "axios";
import Popup from "@/components/Popup.vue";

export default {
  name: "Product",
  components: { Popup },
  data() {
    return {
      product: {},
      quantity: 1,
      loading: true,
      error: "",
      showSuccessMessage: false,
      addProductName: ""
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit("setLoading", true);
      const { category_slug, product_slug } = this.$route.params;

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/products/${category_slug}/${product_slug}/`
        );
        document.title = `${response.data.name} - E-Store`;

        this.product = response.data;
        this.loading = false;
      } catch (err) {
        this.error =
          err?.response?.data?.detail ||
          "Something went wrong while loading the product.";
        this.loading = false;
      }
      this.$store.commit("setLoading", false);
    },
    addToCart() {
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }
      const item = {
        product: this.product,
        quantity: Number(this.quantity)
      };
      this.addProductName = this.product.name;
      this.$store.commit("addToCart", item);
      // show success message briefly on each add
      this.showSuccessMessage = true;
      clearTimeout(this._successTimeout);
      this._successTimeout = setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2500);
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
