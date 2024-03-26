import Component from "@ember/component";
import { inject as service } from "@ember/service";
export default Component.extend({
  myService: service(),
  router: service(),
  actions: {
    handleSearchButton() {
      event.preventDefault();
      var button = document.getElementById("searchBtn");
      if (button.innerText == "Clear") {
        document.getElementById("searchBar").value = "";
      }
      var search_text = document
        .getElementById("searchBar")
        .value.toLowerCase();
      var tableRows = document
        .getElementById("marvel")
        .getElementsByTagName("tr");
      for (var i = 1; i < tableRows.length; i++) {
        var rowText = tableRows[i].textContent.toLowerCase();
        if (rowText.includes(search_text)) {
          tableRows[i].style.display = "table-row";
        } else {
          tableRows[i].style.display = "none";
        }
      }
      if (button.innerText == "Search") {
        button.innerText = "Clear";
        return;
      } else if (button.innerText == "Clear") {
        button.innerText = "Search";
        return;
      }
    },
    handleAddButton() {
      event.preventDefault();
      this.get("router").transitionTo("add", this.get("myService").tableName);
    },
    handleEditButton() {
      event.preventDefault();
      const row = event.target.closest("tr");
      var id = row.cells[1].innerText;
      this.get("router").transitionTo(
        "edit",
        this.get("myService").tableName,
        id
      );
    },
    handleRowClick() {
      var row = event.target.parentNode.cells[0].firstElementChild.checked;
      if (row == true) {
        event.target.parentNode.cells[0].firstElementChild.checked = false;
      } else {
        event.target.parentNode.cells[0].firstElementChild.checked = true;
      }
    },
    async handleSingleDelete() {
      const row = event.target.closest("tr");
      var id = row.cells[1].innerText;
      const url = `DeleteItem/${this.get("myService.tableName")}/${id}`;
      const result = await this.get("myService").fetchData( url,"DELETE");
      if (result) {
        this.get("router").transitionTo({
          queryParams: {
            refresh: null, 
          },
        });
        return true;
      } else {
        return false;
      }
    },
    async handleDeleteButton() {
      var tableRows = document.getElementById("marvel").rows;
      var checkedIndexes = [];
      var k = 0;
      for (var i = 1; i < tableRows.length; i++) {
        if (tableRows[i].cells[0].firstElementChild.checked == true) {
          checkedIndexes[k++] = tableRows[i].cells[1].innerText;
        }
      }
      if (checkedIndexes.length == 0) {
        return;
      }
      const url = `MultipleDelete/${this.get("myService.tableName")}`;
      const result = await this.get("myService").fetchData(url,"DELETE",checkedIndexes);
      if (result) {
        this.get("router").transitionTo({
          queryParams: {
            refresh: null, 
          },
        });
        return true;
      } else {
        return false;
      }
    },
  },
});
