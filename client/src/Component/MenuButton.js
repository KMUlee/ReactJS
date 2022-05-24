import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Login from "./Login";
import Register from "./Register";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const axios = require('axios');

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/logout', {
            logout: true
        }).then(res => this.props.setRefresh())
        this.setState({
            anchorEl: null
        })
    }

    handleClick = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        })
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        })
    }

    render() {
        return (
            <div>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    onClick={this.handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    {this.props.is_logined === true ? null : <StyledMenuItem>
                        <Login handleClose={this.handleClose} setRefresh={this.props.setRefresh} />
                    </StyledMenuItem>}
                    {this.props.is_logined === true ? null : <StyledMenuItem>
                        <Register handleClose={this.handleClose} setRefresh={this.props.setRefresh}/>
                    </StyledMenuItem>}
                    {this.props.is_logined === true ? <StyledMenuItem>
                        <ListItemText primary="Logout" onClick={this.handleFormSubmit}/>
                    </StyledMenuItem> : null}
                </StyledMenu>
            </div>
        );
    }
}

export default MenuButton