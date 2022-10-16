import http from "../http-common";

class StockDataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/${id}`);
  }

  create(data) {
    return http.post("/", data);
  }

  // update(id, data) {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id) {
  //   return http.delete(`/tutorials/${id}`);
  // }

  deleteAll() {
    return http.delete(`/`);
  }

  findByTitle(title) {
    return http.get(`/search?keywords=${title}`);
  }
}

export default new StockDataService();
