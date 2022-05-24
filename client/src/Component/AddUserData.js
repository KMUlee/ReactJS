import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

const axios = require('axios');

class AddUserData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pwd: '',
            site: '',
            open: false,
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/userdata', {
            id: this.state.id,
            pwd: this.state.pwd,
            site: this.state.site,
        })
            .then(res => this.props.setRefresh());
        this.setState({
            open: false,
            id: '',
            pwd: '',
            site: ''
        })
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({
            open: false,
            id: '',
            pwd: '',
            site: ''
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return(
            <div>
                <Button variant={"contained"} color={"primary"} onClick={this.handleClickOpen}>데이터 추가</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>데이터 추가</DialogTitle>
                    <DialogContent>
                        <TextField label={"ID"} type={'text'} name={"id"} value={this.state.id} onChange={this.handleValueChange}/><br/>
                        <TextField label={"PWD"} type={'text'} name={"pwd"} value={this.state.pwd} onChange={this.handleValueChange}/><br/>
                        <TextField label={"Site"} type={'text'} name={"site"} value={this.state.site} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default AddUserData