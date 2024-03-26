import Service from "@ember/service";
import { A } from "@ember/array";
export default Service.extend({
  userDetails: A([]),
  tableList: null,
  tableData: null,
  headRow: null,
  tableName: null,
  editId: null,
  addEdit: null,
  isAdd: null,
  setUserDetails(value) {
    this.get("userDetails").pushObject(value);
  },
  setTabeleList(value) {
    this.set("tableList", value);
  },
  setTabeleData(value) {
    this.set("tableData", value);
    this.getHeadRow(value);
  },
  setTableName(name) {
    this.set("tableName", name);
  },
  setEditId(id) {
    this.set("editId", id);
  },
  setAddEdit(value) {
    this.set("addEdit", value);
  },
  setIsAdd(value) {
    this.set("isAdd", value);
  },
  getHeadRow(value) {
    var ans;
    for (var i = 0; i < 1; i++) {
      ans = value[i];
    }
    const keys = Object.keys(ans);
    this.set("headRow", keys);
  },
  async fetchData(url, method, body = null) {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    try {
      const response = await fetch(
        "https://localhost:7073/api/" + url,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  },
});
