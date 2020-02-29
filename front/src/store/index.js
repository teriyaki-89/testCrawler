import { observable, computed, action } from "mobx";

class Url {
    @observable rows = [];

    @action add(row) {
        this.rows.push(row);
    }
}

//var urls = (window.records = new Urls());
export default new Url();
