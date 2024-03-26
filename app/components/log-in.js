import Component from "@ember/component";
import { A } from "@ember/array";
import { inject as service } from "@ember/service";
export default Component.extend({
  myService: service(),
  router: service(),
  users: A([
    "Guest",
    "Student",
    "Employee",
    "Temporary User",
    "Subscribed user",
  ]),
  user: "Select from the below",
  actions: {
    handleSelectionChange(selectedUser) {
      this.set("user", selectedUser);
    },
    handleLoginButton() {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const auth = this.user;
      const result = {
        name: username,
        auth: auth,
      };
      this.get("myService").setUserDetails(result);
      document.getElementById("form-data").reset();
      this.set("user", "Select from the below");
      this.get('router').transitionTo('home');
    },
  },
});
