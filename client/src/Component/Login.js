import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

const axios = require('axios');

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: '',
            open: false,
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/login', {
            email: this.state.email,
            pwd: this.state.pwd
        }).then(res => this.props.setRefresh())
        this.setState({
            email: '',
            pwd: '',
            open: false,
        });
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
        this.props.handleClose();
    }

    handleClose = () => {
        this.setState({
            email: '',
            pwd: '',
            open: false,
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <ListItemText primary={"Login"} onClick={this.handleClickOpen}/>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <TextField label={"이메일"} type={'text'} name={"email"} value={this.state.email} onChange={this.handleValueChange}/><br/>
                        <TextField label={"비밀번호"} type={'password'} name={"pwd"} value={this.state.pwd} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(Login)