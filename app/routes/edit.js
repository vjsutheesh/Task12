import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";
export default Route.extend({
    myService: service(),
    async model(params) {
      const url = `GetItem/${params.table_name}/${params.id}`;
      this.get('myService').setTableName(params.table_name);
      this.get('myService').setEditId(params.id);
      this.get("myService").setIsAdd(false);
      const result = await this.get("myService").fetchData(url, "GET");
      if (result) {
        this.get("myService").setAddEdit(result);
        return this.routeName;
      } else {
        return false;
      }
    },
});
