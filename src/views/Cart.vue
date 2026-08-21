<template>
  <section>
    <div class="max-w-6xl mx-auto p-4 relative">
      <h1 class="text-2xl font-bold text-center">Cart</h1>

      <div class="bg-white shadow rounded-lg p-4 mt-4">
        <!-- Desktop table -->
        <div class="hidden md:block" v-if="cartTotalLength">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3"></th>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500"
                >
                  Product
                </th>
                <th
                  class="px-6 py-3 text-right text-sm font-medium text-gray-500"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-center text-sm font-medium text-gray-500"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-right text-sm font-medium text-gray-500"
                >
                  Total
                </th>
                <th class="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <CartItem
                v-for="item in cart.items"
                :key="item.product.id"
                :initialItem="item"
                @removeFromCart="handleRemove"
              />
            </tbody>
          </table>
        </div>

        <!-- Mobile cards -->
        <div class="md:hidden" v-if="cartTotalLength">
          <div class="space-y-4">
            <div
              v-for="item in cart.items"
              :key="item.product.id"
              class="bg-white border rounded-lg p-4 flex items-center justify-between"
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="item.product.get_image"
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded"
                />
                <div>
                  <div class="font-semibold">{{ item.product.name }}</div>
                  <div class="text-sm text-gray-500">
                    ${{ item.product.price }}
                  </div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm">Qty: {{ item.quantity }}</div>
                <div class="text-sm font-semibold">
                  ${{ (item.product.price * item.quantity).toFixed(2) }}
                </div>
                <button
                  class="text-red-600 text-sm mt-2"
                  @click="handleRemove(item)"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <p v-else class="text-gray-500">
          You don't have any products in your cart...
        </p>
      </div>

      <div
        class="bg-white shadow rounded-lg p-4 mt-4 flex items-center justify-between"
      >
        <div>
          <div class="text-lg font-bold">${{ cartTotalPrice.toFixed(2) }}</div>
          <div class="text-sm text-gray-500">{{ cartTotalLength }} items</div>
        </div>
        <router-link
          to="/cart/checkout"
          class="bg-gray-900 text-white px-4 py-2 rounded"
          >Proceed to checkout</router-link
        >
      </div>
      <Popup
        :show="showPopup"
        :message="
          removeProductName + ' was removed from the cart successfully.'
        "
        type="success"
      />
    </div>
  </section>
</template>

<script>
import CartItem from "@/components/CartItem.vue";
import Popup from "@/components/Popup.vue";
export default {
  name: "Cart",
  components: { CartItem, Popup },
  data() {
    return {
      showPopup: false,
      removeProductName: ""
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotalLength() {
      return this.cart.items.reduce(
        (acc, curVal) => acc + Number(curVal.quantity),
        0
      );
    },
    cartTotalPrice() {
      return this.cart.items.reduce(
        (acc, curVal) => acc + curVal.product.price * curVal.quantity,
        0
      );
    }
  },
  methods: {
    handleRemove(item) {
      this.removeProductName = item.product.name;
      this.removeFromCart(item);
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2000);
    },
    changeQuantity(productId, quantity) {
      const parsed = Number(quantity);
      if (isNaN(parsed) || parsed < 1) {
        this.$store.commit("removeFromCart", productId);
        return;
      }
      this.$store.commit("updateCartQuantity", { productId, quantity: parsed });
    },
    removeFromCart(item) {
      const id = item && item.product ? item.product.id : item;
      this.$store.commit("removeFromCart", id);
    }
  }
};
</script>

<style scoped>
.mobile-cart-list img,
.mobile-cart-item img {
  object-fit: cover;
  border-radius: 0.375rem;
}
</style>
