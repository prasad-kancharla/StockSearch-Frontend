<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3 searchBar">
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
        <!-- <Dropdown
          :options="[
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
          ]"
          v-on:selected="validateSelection"
          v-on:filter="getDropdownValues"
          :disabled="false"
          name="zipcode"
          :maxItem="10"
          placeholder="Please select an option"
        >
        </Dropdown> -->
      </div>
    </div>
    <div class="col-md-6" v-if="this.showFilteredStocks">
      <!-- <h4>Stocks List</h4> -->
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(stock, index) in stocks"
          :key="index"
          @click="setActiveStock(stock, index)"
        >
          {{ stock.ticker + " - " + stock.name }}
        </li>
      </ul>

      <!-- <button class="m-3 btn btn-danger btn-outline" @click="reset">
        Reset
      </button> -->
    </div>
    <div class="col-md-6">
      <div v-if="currentStock">
        <h4>Stock</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentStock.name }}
        </div>
        <div>
          <label><strong>Ticker:</strong></label> {{ currentStock.ticker }}
        </div>
        <div>
          <label><strong>Sector:</strong></label>
          {{ currentStock.sector }}
        </div>
        <div>
          <label><strong>Market Cap:</strong></label>
          {{ currentStock.marketCap.toFixed(2) + " Cr" }}
        </div>
        <div>
          <label><strong>Closing Price:</strong></label>
          {{ "₹ " + currentStock.closePrice.toFixed(2) }}
        </div>
        <div>
          <label><strong>PE Ratio:</strong></label>
          {{ currentStock.peRatio.toFixed(2) }}
        </div>

        <!-- <router-link :to="'' + currentStock.id" class="badge badge-warning"
          >Edit</router-link
        > -->
      </div>
      <!-- <div v-else>
        <br />
        <p>Please click on a Stock...</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import StockDataService from "../services/StockDataService";

export default {
  name: "stocks-list",
  data() {
    return {
      title: "",
      showFilteredStocks: false,
      stocks: [],
      currentStock: null,
      currentIndex: -1,
      name: "",
    };
  },
  watch: {
    // whenever title changes, this function will run
    title(newTitle) {
      if (newTitle.length != 0) {
        this.searchTitle();
      }
      if (!newTitle) {
        this.reset();
      }
    },
  },
  methods: {
    // retrieveStocks() {
    //   console.log("Inside retrieve stocks");
    //   StockDataService.getAll()
    //     .then((response) => {
    //       this.stocks = response.data;
    //       console.log(response);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },

    refreshList() {
      // this.retrieveStocks();
      this.currentStock = null;
      this.currentIndex = -1;
    },

    setActiveStock(stock, index) {
      this.currentStock = stock;
      this.currentIndex = stock ? index : -1;
    },

    reset() {
      this.title = "";
      this.showFilteredStocks = false;
      this.currentStock = null;
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
      this.showFilteredStocks = true;
      console.log("Inside search title method");
      console.log("Title:", this.title);
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
    // this.retrieveStocks();
  },
};
</script>

<style>
.searchBar {
  margin-top: 30px;
}
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
