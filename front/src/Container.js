import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";

//export default function SimpleContatiner(props) {
const WrapperForClasses = props => {
    const useStyles = makeStyles({
        root: {
            border: "1px solid #ccc",
            borderRadius: "2px"
        },
        select: {}
    });
    const classes = useStyles();
    return (
        <Container className={classes.root} maxWidth="md">
            <Select className={classes.select} />
        </Container>
    );
};

export default class extends React.Component {
    render() {
        return (
            <div>
                <WrapperForClasses />
            </div>
        );
    }
}
