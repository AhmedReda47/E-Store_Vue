<template>
  <section class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="mb-6">
      <p
        class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600"
      >
        Checkout
      </p>
      <h1 class="mt-2 text-3xl font-bold text-slate-900">
        Complete your order
      </h1>
    </div>

    <div v-if="cart.items.length" class="space-y-6">
      <div
        class="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6"
      >
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-slate-900">Your cart</h2>
          <span
            class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
          >
            {{ cartTotalLength }} item{{ cartTotalLength > 1 ? "s" : "" }}
          </span>
        </div>

        <div class="overflow-hidden rounded-xl border border-slate-200 overflow-x-scroll">
          <table class="min-w-full divide-y divide-slate-200">
            <thead class="bg-slate-50">
              <tr class="text-left text-sm text-slate-500">
                <th class="px-4 py-3 font-medium">Product</th>
                <th class="px-4 py-3 font-medium">Price</th>
                <th class="px-4 py-3 font-medium">Qty</th>
                <th class="px-4 py-3 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 bg-white">
              <tr
                v-for="item in cart.items"
                :key="item.product.id"
                class="align-middle"
              >
                <td class="px-4 py-4 font-medium text-slate-800">
                  {{ item.product.name }}
                </td>
                <td class="px-4 py-4 text-slate-700">
                  ${{ Number(item.product.price).toFixed(2) }}
                </td>
                <td class="px-4 py-4 text-slate-700">{{ item.quantity }}</td>
                <td class="px-4 py-4 text-right font-semibold text-slate-900">
                  ${{ getItemTotal(item).toFixed(2) }}
                </td>
              </tr>
            </tbody>
            <tfoot class="bg-slate-50">
              <tr>
                <td
                  class="px-4 py-3 text-sm font-semibold text-slate-700"
                  colspan="2"
                >
                  Total
                </td>
                <td class="px-4 py-3 text-sm font-semibold text-slate-700">
                  {{ cartTotalLength }}
                </td>
                <td
                  class="px-4 py-3 text-right text-base font-bold text-slate-900"
                >
                  ${{ cartTotalPrice.toFixed(2) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div
        class="rounded-2xl bg-slate-900 p-5 text-white shadow-xl shadow-slate-900/10 sm:p-6"
      >
        <div class="mb-5">
          <p
            class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300"
          >
            Shipping details
          </p>
          <h2 class="mt-2 text-2xl font-bold">Delivery info</h2>
        </div>

        <div class="space-y-4">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm text-slate-300"
                >First name*</label
              >
              <input
                type="text"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                v-model="first_name"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-slate-300"
                >Last name*</label
              >
              <input
                type="text"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                v-model="last_name"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm text-slate-300">E-mail*</label>
            <input
              type="email"
              class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              v-model="email"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm text-slate-300">Phone*</label>
            <input
              type="text"
              class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              v-model="phone"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm text-slate-300">Address*</label>
            <input
              type="text"
              class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              v-model="address"
            />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm text-slate-300">Zip code*</label>
              <input
                type="text"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                v-model="zipcode"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm text-slate-300">Place*</label>
              <input
                type="text"
                class="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                v-model="place"
              />
            </div>
          </div>
        </div>

        <div
          v-if="errors.length"
          class="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"
        >
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <hr class="my-5 border-slate-700" />

        <div
          id="card-element"
          class="mb-5 rounded-xl border border-slate-700 bg-slate-800 p-3"
        ></div>

        <template v-if="cartTotalLength">
          <button
            class="w-full rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
            @click="submitForm"
          >
            Pay with Stripe
          </button>
        </template>
      </div>
    </div>

    <div
      v-else
      class="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200"
    >
      <div
        class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600"
      >
        🛒
      </div>
      <h2 class="text-xl font-bold text-slate-900">Your cart is empty</h2>
      <p class="mt-2 text-sm text-slate-500">
        Add some products before continuing to checkout.
      </p>
      <router-link
        to="/"
        class="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Continue shopping
      </router-link>
    </div>
  </section>
</template>

<script>
import axios from "axios";
export default {
  name: "Checkout",
  data() {
    return {
      cart: {
        items: []
      },
      stripe: {},
      card: {},
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      zipcode: "",
      place: "",
      errors: []
    };
  },
  mounted() {
    document.title = "Checkout | E-Store";
    this.cart = this.$store.state.cart;
    this.initializeStripe();
  },
  methods: {
    initializeStripe() {
      if (this.cartTotalLength <= 0) {
        return;
      }

      this.$nextTick(() => {
        const cardElement = document.getElementById("card-element");

        if (!cardElement) {
          return;
        }

        if (!this.stripe || typeof this.stripe.elements !== "function") {
          this.stripe = Stripe(
            "pk_test_51U59DdRzsKBXlHwgMz4GHuq15H0qZVGCb33pULEI8fdx41fTLA3uvX4HB2iPrjlxvPhuI0XYHbdVeHpfEHmslONt00AytA7k2k"
          );
        } 

        if (this.card && typeof this.card.unmount === "function") {
          this.card.unmount();
        }

        const elements = this.stripe.elements();
        this.card = elements.create("card", { hidePostalCode: true });
        this.card.mount(cardElement);
      });
    },
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    submitForm() {
      this.errors = [];

      if (this.first_name === "") {
        this.errors.push("The first name field is missing!");
      }

      if (this.last_name === "") {
        this.errors.push("The last name field is missing!");
      }

      if (this.email === "") {
        this.errors.push("The email field is missing!");
      }

      if (this.phone === "") {
        this.errors.push("The phone field is missing!");
      }

      if (this.address === "") {
        this.errors.push("The address field is missing!");
      }

      if (this.zipcode === "") {
        this.errors.push("The zip code field is missing!");
      }

      if (this.place === "") {
        this.errors.push("The place field is missing!");
      }

      if (!this.errors.length) {
        this.$store.commit("setIsLoading", true);

        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);

            this.errors.push(
              "Something went wrong with Stripe. Please try again"
            );

            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];
      for (let i = 0; i < this.cart.items.length; i++) {
        const item = this.cart.items[i];
        const obj = {
          product: item.product.id,
          quantity: item.quantity,
          price: item.product.price * item.quantity
        };
        items.push(obj);
      }
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zipcode,
        place: this.place,
        phone: this.phone,
        items: items,
        stripe_token: token.id
      };

      await axios
        .post("/api/v1/checkout/", data)
        .then((response) => {
          this.$store.commit("clearCart");
          this.$router.push("/cart/success");
        })
        .catch((error) => {
          this.errors.push("Something went wrong, Please try again");
          console.log(error);
        });
      this.$store.commit("setIsLoading", false);
    }
  },
  watch: {
    cartTotalLength: {
      handler(newValue) {
        if (newValue > 0) {
          this.initializeStripe();
        }
      },
      immediate: true
    }
  },
  computed: {
    cartTotalPrice() {
      return this.cart.items.reduce(
        (acc, curVal) => acc + curVal.product.price * curVal.quantity,
        0
      );
    },
    cartTotalLength() {
      return this.cart.items.reduce(
        (acc, curVal) => acc + Number(curVal.quantity),
        0
      );
    }
  }
};
</script>
