import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { observer } from "mobx-react";
import UrlStore from "./store/index";

const WrapperForSelect = props => {
    const [val, setValue] = React.useState("");
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);

    const handleChange = e => {
        setValue(e.target.value);
        props.cb(e.target.value);
    };
    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
            maxWidth: 300,
            marginTop: "25px"
        },
        selectEmpty: {
            marginTop: theme.spacing(1)
        },
        InputLabel: {
            marginTop: "-10px"
        },
        TextField: {
            marginTop: "25px"
        }
    }));
    const classes = useStyles();

    return (
        <div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                        className={classes.InputLabel}
                    >
                        Websites
                    </InputLabel>
                    <Select
                        id="demo-simple-select-outlined"
                        value={val}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.urls}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                        className={classes.InputLabel}
                    >
                        H1 tags
                    </InputLabel>
                    <Select
                        id="h1Select"
                        value={props.state.selectH1Val}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.state.h1Arr.map((row, id) => {
                            return (
                                <MenuItem key={id} value={row}>
                                    {row}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                        className={classes.InputLabel}
                    >
                        H2 tags
                    </InputLabel>
                    <Select
                        id="h2Select"
                        value={props.state.selectH2Val}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.state.h2Arr.map((row, id) => {
                            return (
                                <MenuItem key={id} value={row}>
                                    {row}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                        className={classes.InputLabel}
                    >
                        H3 tags
                    </InputLabel>
                    <Select
                        id="h3Select"
                        value={props.state.selectH3Val}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.state.h3Arr.map((row, id) => {
                            return (
                                <MenuItem key={id} value={row}>
                                    {row}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={inputLabel}
                        id="demo-simple-select-outlined-label"
                        className={classes.InputLabel}
                    >
                        links
                    </InputLabel>
                    <Select
                        id="h3Select"
                        value={props.state.selectAhrefArr}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {props.state.aArr.map((row, id) => {
                            return (
                                <MenuItem key={id} value={row}>
                                    {row}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default
@observer
class extends React.Component {
    constructor(props) {
        super(props);
        this.defaultState = {
            val: null,
            h1Arr: [],
            selectH1Val: "",
            h2Arr: [],
            selectH2Val: "",
            h3Arr: [],
            selectH3Val: "",
            aArr: [],
            selectAhrefArr: ""
        };
        this.state = this.defaultState;
    }
    render() {
        let urls = UrlStore.rows.map((item, index) => {
            return (
                <MenuItem key={index} value={index}>
                    {item.url}
                </MenuItem>
            );
        });

        return (
            <WrapperForSelect
                urls={urls}
                state={this.state}
                cb={this.cb.bind(this)}
            ></WrapperForSelect>
        );
    }
    cb(id) {
        if (id >= 0 && id !== "") {
            let tempArrH1 = JSON.parse(UrlStore.rows[id].h1);
            let selectH1Val = tempArrH1[0] ? tempArrH1[0] : "";
            let tempArrH2 = JSON.parse(UrlStore.rows[id].h2);
            let selectH2Val = tempArrH2[0] ? tempArrH2[0] : "";
            let tempArrH3 = JSON.parse(UrlStore.rows[id].h3);
            let selectH3Val = tempArrH3[0] ? tempArrH3[0] : "";
            let tempArrAHref = JSON.parse(UrlStore.rows[id].aHref);
            let selectAhrefArr = tempArrAHref[0] ? tempArrAHref[0] : "";
            this.setState({
                h1Arr: tempArrH1,
                selectH1Val,
                h2Arr: tempArrH2,
                selectH2Val,
                h3Arr: tempArrH3,
                selectH3Val,
                aArr: tempArrAHref,
                selectAhrefArr
            });
        } else {
            this.setState(this.defaultState);
        }
    }
}
