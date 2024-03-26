import Component from '@ember/component';
import { inject as service } from "@ember/service";
export default Component.extend({
    myService:service(),
    router:service(),
    actions:{
        handleViewButton() {
            const tableName = event.target.value
            this.get('router').transitionTo('display',tableName);
        }
    }
});
