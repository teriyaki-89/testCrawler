import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { observer } from "mobx-react";
import { toJS } from "mobx";
import UrlStore from "./store/index";

const WrapperForSelect = props => {
    const [val, setValue] = React.useState("");
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const handleChange = event => {
        setValue(event.target.value);
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
        }
    }));
    const classes = useStyles();

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
        </FormControl>
    );
};

export default
@observer
class extends React.Component {
    render() {
        let urls = UrlStore.rows.map((item, index) => {
            return (
                <MenuItem key={index} value={item.url}>
                    {item.url}
                </MenuItem>
            );
        });
        return <WrapperForSelect urls={urls}></WrapperForSelect>;
    }
}
