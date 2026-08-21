<template>
  <tr class="bg-white">
    <td class="px-4 py-3">
      <img
        :src="item.product.get_image"
        :alt="item.product.name"
        class="w-16 h-16 object-cover rounded"
      />
    </td>

    <td class="px-4 py-3">
      <router-link
        :to="item.product.get_absolute_url"
        class="font-semibold text-gray-900"
        >{{ item.product.name }}</router-link
      >
      <div class="text-sm text-gray-500">SKU: {{ item.product.id }}</div>
    </td>

    <td class="px-4 py-3 text-right">${{ item.product.price }}</td>

    <td class="px-4 py-3 text-center">
      <div class="inline-flex items-center border rounded overflow-hidden">
        <button
          class="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100"
          @click="decrementQuantity(item)"
        >
          -
        </button>
        <input
          class="w-12 text-center text-sm border-l border-r"
          type="number"
          min="1"
          :value="item.quantity"
          @change="onQuantityInput($event, item)"
        />
        <button
          class="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100"
          @click="incrementQuantity(item)"
        >
          +
        </button>
      </div>
    </td>

    <td class="px-4 py-3 text-right">${{ getItemTotal(item).toFixed(2) }}</td>

    <td class="px-4 py-3 text-right">
      <button
        class="text-red-600 hover:text-red-800 text-sm"
        @click="removeFromCart(item)"
      >
        Remove
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "CartItem",
  props: {
    initialItem: Object
  },
  data() {
    return { item: this.initialItem };
  },
  methods: {
    getItemTotal(item) {
      return item.quantity * item.product.price;
    },
    decrementQuantity(item) {
      if (item.quantity <= 1) {
        this.$emit("removeFromCart", item);
        // this.updateCart();
        return;
      }
      item.quantity = Number(item.quantity) - 1;
      // this.updateCart();
    },
    incrementQuantity(item) {
      item.quantity = Number(item.quantity) + 1;
      this.updateCart();
    },
    onQuantityInput(e, item) {
      let val = Number(e.target.value);
      if (isNaN(val) || val < 1) val = 1;
      item.quantity = val;
      this.updateCart();
    },
    updateCart() {
      try {
        localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
      } catch (err) {
        console.warn("Unable to update localStorage cart", err);
      }
    },
    removeFromCart(item) {
      this.$emit("removeFromCart", item);
      // this.updateCart();
    }
  }
};
</script>
