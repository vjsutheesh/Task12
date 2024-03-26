import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
export default Route.extend({
  myService: service(),
  url: "GetTable",
  async model() {
    const result = await this.get("myService").fetchData(this.url, "GET");
    if (result) {
      this.get("myService").setTabeleList(result);
      return true;
    } else {
      return false;
    }
  },
});
