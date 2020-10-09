import React, {Component} from "react";
import {AppBar, Link, Toolbar, Menu, MenuItem, Button} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import SLAC_LogoSD_W from '../SLAC_LogoSD_W.png'
import get_schedules from "../utils";

const useStyles = theme => ({
    appBarStyle: {
        backgroundColor: "#8C1515",
    },

    logo: {
        marginRight: theme.spacing(2)
    },

    toolbarItems: {
        color: "white",
        padding: 20,
        textTransform: "none",
        fontFamily: ["Avenir", "sans-serif"],
        fontSize: 16,
        '&:hover': {
            background: "white",
            color: "#8C1515",
            textDecoration: "none"
        },
    },

    lastLink: {
        marginLeft: "auto"
    }
})


class MainMenu extends Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.state = {
            anchorEl: null,
            beamlines: []
        }
    }

    handleClose() {
        this.setState({anchorEl: null});
    }

    handleClick(event) {
        this.setState({anchorEl: event.currentTarget});
    }

    async handleLogOut(event) {
        event.preventDefault();

        try {
            const reponse = await fetch("/logout", {
                method: "POST"
            })

            const resp_json = await reponse.json();
            console.log(resp_json.message)
        } catch(error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        const schedules = await get_schedules();
        if (schedules === null) {
            console.log("Schedules is null");
        }
        else {
            console.log(schedules);
            this.setState({ beamlines: schedules });
        }
    }

    render() {
        const {classes} = this.props

        return (
            <AppBar position="static" className={classes.appBarStyle}>
                <Toolbar>
                    <img src={SLAC_LogoSD_W} alt={"logo"} height={30} className={classes.logo}/>
                    <Link href="/" className={classes.toolbarItems}>XDART</Link>
                    <Link href="https://userportal.slac.stanford.edu/" className={classes.toolbarItems}>User Portal</Link>
                    <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        className={classes.toolbarItems}
                        onMouseOver={this.handleClick}
                    >
                        Beamline Controls
                    </Button>
                    <Menu
                        id="beamlineMenu"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        getContentAnchorEl={null}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                        MenuListProps={{ onMouseLeave: this.handleClose }}
                    >
                        <MenuItem onClick={this.handleClose}>2-1</MenuItem>
                        <MenuItem onClick={this.handleClose}>11-3</MenuItem>
                    </Menu>
                    <Link href="#" onClick={this.handleLogOut} className={[classes.toolbarItems, classes.lastLink].join(' ')}>Log Out</Link>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(useStyles)(MainMenu)