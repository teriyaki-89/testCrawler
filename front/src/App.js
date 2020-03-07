import React, { Component } from "react";
import Container from "./Container";
import { observer } from "mobx-react";
import UrlStore from "./store/index";

export default
@observer
class CustomComponent extends React.Component {
    async componentDidMount() {
        this.getContent();
    }

    getContent() {
        let url = UrlStore.server + "urls";
        fetch(url)
            .then(r => r.json())
            .then(data => {
                data.map(row => {
                    UrlStore.add(row);
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return <Container></Container>;
    }
}
