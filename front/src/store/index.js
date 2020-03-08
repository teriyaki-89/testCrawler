import { observable, computed, action } from "mobx";

const server =
    process.env.NODE_ENV == "development"
        ? "http://localhost:3001/"
        : "http://139.99.237.158:3001/";
class Url {
    @observable rows = [];
    @observable server = server;

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
