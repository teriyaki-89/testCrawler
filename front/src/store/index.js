import { observable, computed, action } from "mobx";

class Url {
    @observable rows = [];
    @observable server = "http://localhost:3001/";

    @action add(row) {
        let match = this.rows.find(item => item.url == row.url);
        if (match) {
            let index = this.rows.indexOf(match);
            this.rows[index] = row;
        } else {
            this.rows.push(row);
        }
    }
}

//var urls = (window.records = new Urls());
export default new Url();
