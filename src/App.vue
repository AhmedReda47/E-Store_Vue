<template>
  <AppLayout />
</template>

<script>
import axios from "axios";
import AppLayout from "./components/AppLayout.vue";

export default {
  components: {
    AppLayout
  },
    beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token

    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  },
};
</script>

<style scoped></style>
