import React from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Select from "./Select";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

import UrlStore from "./store/index";

const WrapperForClasses = props => {
    const useStyles = makeStyles(theme => ({
        root: {
            border: "1px solid #ccc",
            borderRadius: "2px"
        },
        select: {},
        tabs: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            margin: "10px 0"
        },
        margin: {
            margin: theme.spacing(1)
        },
        withoutLabel: {
            marginTop: theme.spacing(3)
        },
        textField: {
            width: 200
        },
        div: {
            margin: "0 auto",
            width: "300px",
            textAlign: "center"
        },
        button: {
            margin: "20px"
        }
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    let inputVal = "";
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const [snackMessage, setSnackMessage] = React.useState(0);
    const handleClick = attr => {
        setSnackMessage(attr);
        setOpen(true);
    };

    const alertArr = [
        {
            status: "success",
            message: "The following url has been successfully parsed"
        },
        {
            status: "error",
            message: "An error occured"
        },
        {
            status: "error",
            message: "Type correct url"
        }
    ];

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box p={3}>{children}</Box>}
            </Typography>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`
        };
    }
    function parseUrl() {
        let url = UrlStore.server + "url?url=" + inputVal;
        let urlPattern = /[\w0-9]{2,10}\.[\w0-9]{2,10}\.?([\w0-9]+)?/;
        if (!urlPattern.test(inputVal)) {
            return handleClick(2);
        }
        fetch(url, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                if (data._id) {
                    UrlStore.add(data);
                    handleClick(0);
                } else {
                    handleClick(1);
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    function setInputUrlFromInput(e) {
        inputVal = e.target.value;
    }
    return (
        <Container className={classes.root} maxWidth="md">
            <div className={classes.tabs}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="simple tabs example"
                    >
                        <Tab label="Parse Url" {...a11yProps(0)} />
                        <Tab label="List tags of pages" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div className={classes.div}>
                        <TextField
                            label="Fill in correct url"
                            id="standard-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            onChange={setInputUrlFromInput}
                            defaultValue={inputVal}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        https://
                                    </InputAdornment>
                                )
                            }}
                        />
                        <div className={classes.button}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={parseUrl}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Select className={classes.select} />
                </TabPanel>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={handleClose}
                    severity={alertArr[snackMessage].status}
                >
                    {alertArr[snackMessage].message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = { url: "" };
    }
    render() {
        return (
            <div>
                <WrapperForClasses />
            </div>
        );
    }
}
