<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="stock.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="sector">Sector</label>
        <input
          class="form-control"
          id="sector"
          required
          v-model="stock.sector"
          name="sector"
        />
      </div>

      <button @click="saveStock" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newStock">Add</button>
    </div>
  </div>
</template>

<script>
import StockDataService from "../services/StockDataService";

export default {
  name: "add-stock",
  data() {
    return {
      stock: {
        id: null,
        name: "",
        sector: "",
        marketCap: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveStock() {
      var data = {
        name: this.stock.name,
        sector: this.stock.sector,
        marketCap: this.stock.marketCap,
      };

      StockDataService.create(data)
        .then((response) => {
          this.stock.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newStock() {
      this.submitted = false;
      this.stock = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
