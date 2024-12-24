import session from "~/store/session";
import sya from "~/store/sya";

class Store {
  get session() {
    return session();
  }
  get sya() {
    return sya();
  }
}

const store = new Store();
export default store;
