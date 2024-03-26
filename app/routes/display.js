import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
export default Route.extend({
  myService: service(),
  queryParams: {
    refresh: {
      refreshModel: true,
    },
  },
  async model(params) {
    const url = `GetItems/${params.table_name}`;
    this.get("myService").setTableName(params.table_name);
    const result = await this.get("myService").fetchData(url, "GET");
    if (result) {
      this.get("myService").setTabeleData(result);
      return true;
    } else {
      return false;
    }
  },
});
