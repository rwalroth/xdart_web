import React, {Component} from "react";
import {Menu} from "semantic-ui-react";

export default class MainMenu extends Component {
    state = {}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state

        return (
            <Menu>
                <Menu.Item
                    name={"Xdart"}
                    active={activeItem === "Xdart"}
                    onClick={this.handleItemClick}
                >
                    Xdart
                </Menu.Item>
                <Menu.Item
                    name={"uportal"}
                    active={activeItem === "uportal"}
                    onClick={this.handleItemClick}
                >
                    User Portal
                </Menu.Item>
                <Menu.Item
                    name={"blcontols"}
                    active={activeItem === "blcontrols"}
                    onClick={this.handleItemClick}
                >
                    Beamline Controls
                </Menu.Item>
                <Menu.Item
                    name={"atools"}
                    active={activeItem === "atools"}
                    onClick={this.handleItemClick}
                >
                    Analysis Tools
                </Menu.Item>
            </Menu>
        )
    }
}