import { createStore } from "vuex";

export default createStore({
  state: {
    cart: {
      items: []
    },
    isAuthenticated: false,
    token: "",
    isLoading: false
  },
  getters: {},
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"));
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }

      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateCartQuantity(state, { productId, quantity }) {
      const item = state.cart.items.find((i) => i.product.id === productId);
      if (!item) return;
      const parsedQty = Number(quantity);
      if (parsedQty < 1) {
        state.cart.items = state.cart.items.filter(
          (i) => i.product.id !== productId
        );
      } else {
        item.quantity = parsedQty;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    removeFromCart(state, productId) {
      state.cart.items = state.cart.items.filter(
        (i) => i.product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },
    clearCart(state) {
      state.cart = {
        items: []
      };

      localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  },
  actions: {},
  modules: {}
});
