import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";
export default Route.extend({
  myService: service(),
  async model(params) {
    const url = `GetSchema/${params.table_name}`;
    this.get('myService').setTableName(params.table_name);
    this.get("myService").setIsAdd(true);
    const result = await this.get("myService").fetchData(url, "GET");
    if (result) {
      this.get("myService").setAddEdit(result);
      return this.routeName;
    } else {
      return false;
    }
  },
});
