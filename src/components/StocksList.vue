<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search stocks"
          v-model="title"
          @change="searchTitle"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Stocks List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(stock, index) in stocks"
          :key="index"
          @click="setActiveStock(stock, index)"
        >
          {{ stock.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllStocks">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentStock">
        <h4>Stock</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentStock.name }}
        </div>
        <div>
          <label><strong>Sector:</strong></label>
          {{ currentStock.sector }}
        </div>
        <div>
          <label><strong>Market Cap:</strong></label>
          {{ currentStock.marketCap }}
        </div>

        <router-link :to="'' + currentStock.id" class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Stock...</p>
      </div>
    </div>
  </div>
</template>

<script>
import StockDataService from "../services/StockDataService";

export default {
  name: "stocks-list",
  data() {
    return {
      stocks: [],
      currentStock: null,
      currentIndex: -1,
      name: "",
    };
  },
  methods: {
    retrieveStocks() {
      console.log("Inside retrieve stocks");
      StockDataService.getAll()
        .then((response) => {
          this.stocks = response.data;
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveStocks();
      this.currentStock = null;
      this.currentIndex = -1;
    },

    setActiveStock(stock, index) {
      this.currentStock = stock;
      this.currentIndex = stock ? index : -1;
    },

    removeAllStocks() {
      StockDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      console.log("Inside search title method");
      StockDataService.findByTitle(this.title)
        .then((response) => {
          console.log("Response :", response);
          this.stocks = response.data.Stocks;
          this.setActiveStock(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveStocks();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
