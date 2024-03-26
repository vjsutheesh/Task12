import Component from "@ember/component";
import { inject as service } from "@ember/service";
export default Component.extend({
  myService: service(),
  router: service(),
  actions: {
    async handleUpdatebutton() {
      event.preventDefault();
      const button = event.target.innerText;
      const head = this.get("myService.addEdit");
      if (button == "ADD") {
        var dataObject = {};
        for (var i = 0; i < head.length; i++) {
          dataObject[head[i]] = document.getElementById(head[i]).value;
        }
        var data = {
          TableName: this.get("myService.tableName"),
          Data: dataObject,
        };
        const result = await this.get("myService").fetchData(
          `AddItem`,
          "POST",
          data
        );
        if (result) {
          this.get("router").transitionTo(
            "display",
            this.get("myService.tableName")
          );
        } else {
            this.get("router").transitionTo('home');
        }
      } else if (button == "EDIT") {
        for (const key in head) {
            head[key] = document.getElementById(key).value;
        }
        var body = {
          TableName: this.get("myService.tableName"),
          Data: head,
        };
        const result = await this.get("myService").fetchData(
          `UpdateItem/${this.get("myService.editId")}`,
          "PUT",
          body
        );
        if (result) {
          this.get("router").transitionTo(
            "display",
            this.get("myService.tableName")
          );
        } else {
            this.get("router").transitionTo('home');
        }
      }
    },
  },
});
