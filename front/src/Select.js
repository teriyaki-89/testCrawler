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
    const [id, setID] = React.useState(-1);
    const handleChange = event => {
        setValue(event.target.value);
        setID(event.target.value);
    };
    const useStyles = makeStyles(theme => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 240,
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
    console.log(val);

    return (
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
            <div className={classes.TextField}>
                {id >= 0 && UrlStore.rows[id] ? (
                    <TextField
                        id="standard-H1"
                        label="H1 tag"
                        value={UrlStore.rows[id].h1}
                    />
                ) : (
                    ""
                )}
            </div>

            <div className={classes.TextField}>
                <TextField
                    id="standard-H2"
                    label="H2 tag"
                    defaultValue="Default Value"
                />
            </div>
        </FormControl>
    );
};

export default
@observer
class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { val: null };
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
            <WrapperForSelect urls={urls} state={this.state}></WrapperForSelect>
        );
    }
}
