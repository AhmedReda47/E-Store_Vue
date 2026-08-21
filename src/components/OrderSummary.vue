<template>
  <div
    class="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-100"
  >
    <div
      class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6"
    >
      <div>
        <p
          class="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600"
        >
          Order
        </p>
        <h3 class="mt-2 text-xl font-bold text-slate-900">#{{ order.id }}</h3>
      </div>

      <span
        class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
      >
        {{ orderTotalLength }} item{{ orderTotalLength > 1 ? "s" : "" }}
      </span>
    </div>

    <div class="p-4 sm:p-6">
      <h4 class="mb-4 text-lg font-semibold text-slate-800">Products</h4>

      <div class="overflow-hidden rounded-xl border border-slate-200">
        <table class="min-w-full divide-y divide-slate-200 text-left">
          <thead class="bg-slate-50">
            <tr class="text-sm text-slate-500">
              <th class="px-4 py-3 font-medium">Product</th>
              <th class="px-4 py-3 font-medium">Price</th>
              <th class="px-4 py-3 font-medium">Qty</th>
              <th class="px-4 py-3 text-right font-medium">Total</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-200 bg-white">
            <tr
              v-for="item in order.items"
              :key="item.product.id"
              class="align-middle"
            >
              <td class="px-4 py-3 font-medium text-slate-800">
                {{ item.product.name }}
              </td>
              <td class="px-4 py-3 text-slate-700">
                ${{ Number(item.product.price).toFixed(2) }}
              </td>
              <td class="px-4 py-3 text-slate-700">{{ item.quantity }}</td>
              <td class="px-4 py-3 text-right font-semibold text-slate-900">
                ${{ getItemTotal(item).toFixed(2) }}
              </td>
            </tr>
          </tbody>

          <tfoot class="bg-slate-50">
            <tr>
              <td
                colspan="2"
                class="px-4 py-3 text-sm font-semibold text-slate-700"
              >
                Total
              </td>
              <td class="px-4 py-3 text-sm font-semibold text-slate-700">
                {{ orderTotalLength }}
              </td>
              <td
                class="px-4 py-3 text-right text-base font-bold text-slate-900"
              >
                ${{ orderTotal.toFixed(2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",
  props: {
    order: Object
  },
  computed: {
    orderTotalLength() {
      return (
        this.order?.items?.reduce(
          (acc, curVal) => acc + Number(curVal.quantity),
          0
        ) || 0
      );
    },
    orderTotal() {
      return (
        this.order?.items?.reduce((acc, curVal) => {
          return acc + Number(curVal.quantity) * Number(curVal.product.price);
        }, 0) || 0
      );
    }
  },
  methods: {
    getItemTotal(item) {
      return Number(item.quantity) * Number(item.product.price);
    }
  }
};
</script>
