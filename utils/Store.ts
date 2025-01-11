import sya from "~/store/sya";

class Store {
  get sya() {
    return sya();
  }
}

const store = new Store();
export default store;
