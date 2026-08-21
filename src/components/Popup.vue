<template>
 <Transition
  enter-active-class="transition-transform duration-300 ease-out"
  enter-from-class="translate-x-full"
  enter-to-class="translate-x-0"
  leave-active-class="transition-transform duration-300 ease-in"
  leave-from-class="translate-x-0"
  leave-to-class="translate-x-full"
>
  <div
    v-if="show"
    class="fixed bottom-3 right-3 z-50 rounded-lg px-4 py-3 text-md font-semibold shadow-md"
    :class="variantClasses"
  >
    {{ message }}
  </div>
</Transition>
</template>

<script>
export default {
  name: "Popup",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "error"
    }
  },
  computed: {
    variantClasses() {
      if (this.type === "success") return "text-green-700 bg-emerald-50";
      if (this.type === "error") return "text-white bg-red-500";
      return "text-white bg-slate-800";
    }
  }
};
</script>

<style scoped></style>
