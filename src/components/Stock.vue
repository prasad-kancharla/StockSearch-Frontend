<template>
  <div v-if="currentStock" class="edit-form">
    <h4>Stock</h4>
    <form>
      <div class="form-group">
        <label for="title">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentStock.name"
        />
      </div>
      <div class="form-group">
        <label for="sector">Sector</label>
        <input
          type="text"
          class="form-control"
          id="sector"
          v-model="currentStock.sector"
        />
      </div>

      <div class="form-group">
        <label for="marketCap">Market Cap</label>
        <input
          type="text"
          class="form-control"
          id="marketCap"
          v-model="currentStock.marketCap"
        />
      </div>
    </form>

    <!-- <button
      class="badge badge-primary mr-2"
      v-if="currentStock.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button> -->
    <!-- <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button class="badge badge-danger mr-2" @click="deleteStock">
      Delete
    </button>

    <!-- <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button> -->
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Stock...</p>
  </div>
</template>

<script>
import StockDataService from "../services/StockDataService";

export default {
  name: "stock",
  data() {
    return {
      currentStock: null,
      message: "",
    };
  },
  methods: {
    getStock(id) {
      StockDataService.get(id)
        .then((response) => {
          this.currentStock = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // updatePublished(status) {
    //   var data = {
    //     id: this.currentStock.id,
    //     title: this.currentStock.title,
    //     description: this.currentStock.description,
    //     published: status,
    //   };

    //   StockDataService.update(this.currentStock.id, data)
    //     .then((response) => {
    //       console.log(response.data);
    //       this.currentStock.published = status;
    //       this.message = "The status was updated successfully!";
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    // updateTutorial() {
    //   StockDataService.update(this.currentStock.id, this.currentStock)
    //     .then((response) => {
    //       console.log(response.data);
    //       this.message = "The tutorial was updated successfully!";
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    deleteStock() {
      StockDataService.delete(this.currentStock.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "stocks" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getstock(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
