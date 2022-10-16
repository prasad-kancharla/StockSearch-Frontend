import http from "../http-common";

class StockDataService {
  findByTitle(title) {
    return http.get(`/search?keywords=${title}`);
  }
}

export default new StockDataService();
