<template>
  <section>
    <div class="max-h-screen bg-gray-50 px-4 flex items-center justify-center">
      <div
        class="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl"
      >
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-semibold text-gray-900">Sign up</h2>
          <p class="mt-2 text-sm text-gray-500">
            Create your account to get started
          </p>
        </div>

        <form @submit.prevent="submitForm" class="space-y-5">
          <div>
            <label
              for="username"
              class="mb-2 block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              id="username"
              type="text"
              v-model="username"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              for="password"
              class="mb-2 block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              id="password"
              type="password"
              v-model="password"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label
              for="password2"
              class="mb-2 block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              id="password2"
              type="password"
              v-model="password2"
              class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <button
            type="submit"
            @click.prevent="submitForm"
            class="w-full rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          >
            Sign Up
          </button>

          <div
            v-if="errors.length"
            class="rounded-lg border border-red-200 bg-red-50 px-3 py-2"
          >
            <p
              v-for="error in errors"
              :key="error"
              class="text-sm text-red-600"
            >
              {{ error }}
            </p>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <hr class="flex-1 border-gray-200" />
            <span class="text-sm text-gray-500">or</span>
            <hr class="flex-1 border-gray-200" />
          </div>

          <p class="text-center text-sm text-gray-600">
            Already have an account?
            <router-link
              to="/login"
              class="font-medium text-emerald-400 hover:text-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >Login here</router-link
            >
          </p>
        </form>
      </div>
    </div>
    <Popup
      :show="showSuccessMessage"
      :message="`Account created successfully!`"
      type="success"
    />
  </section>
</template>

<script>
import axios from "axios";
import Popup from "@/components/Popup.vue";
export default {
  name: "SignUp",
  components: { Popup },
  data() {
    return {
      username: "",
      password: "",
      password2: "",
      errors: [],
      showSuccessMessage: false
    };
  },
  methods: {
    submitForm() {
      this.errors = [];

      if (!this.username) {
        this.errors.push("Username is required.");
      }
      if (!this.password) {
        this.errors.push("Password is required.");
      }
      if (this.password !== this.password2) {
        this.errors.push("Passwords do not match.");
      }

      if (!this.errors.length) {
        const formData = {
          username: this.username,
          password: this.password
        };

        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            console.log("User created:", response.data);
            this.showSuccessMessage = true;
            clearTimeout(this._successTimeout);
            this._successTimeout = setTimeout(() => {
              this.showSuccessMessage = false;
              this.$router.push("/log-in");
            }, 2000);
          })
          .catch((error) => {
            console.error("Error creating user:", error);
          });
      }
    }
  }
};
</script>
