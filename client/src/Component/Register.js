import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import ListItemText from "@material-ui/core/ListItemText";

const axios = require('axios');

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            pwd: '',
            pwd2: '',
            open: false,
            check: '',
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.pwd !== this.state.pwd2){
            this.setState({check: '비밀번호를 다시 확인해 주세요.'});
            return;
        }
        axios.post('/api/users',{
            nickname: this.state.userName,
            email: this.state.email,
            pwd: this.state.pwd
        }).then((res) => {
            console.log(res)
            if(res.data.state) {
                this.setState({
                    userName: '',
                    email: '',
                    pwd: '',
                    pwd2: '',
                    check: '',
                    open: false
                })
                this.props.setRefresh()
            }
            else{
                this.setState({check: '이미 존재하는 이메일 입니다.'});
            }
        })
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
        this.props.handleClose();
    }

    handleClose = () => {
        this.setState({
            userName: '',
            email: '',
            pwd: '',
            pwd2: '',
            open: false,
            check: '',
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div>
                <ListItemText primary={"Register"} onClick={this.handleClickOpen}/>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Login</DialogTitle>
                    <DialogContent>
                        <TextField label={"이름"} type={'text'} name={"userName"} value={this.state.userName} onChange={this.handleValueChange}/><br/>
                        <TextField label={"이메일"} type={'text'} name={"email"} value={this.state.email} onChange={this.handleValueChange}/><br/>
                        <TextField label={"비밀번호"} type={'password'} name={"pwd"} value={this.state.pwd} onChange={this.handleValueChange}/><br/>
                        <TextField label={"비밀번호 재입력"} type={'password'} name={"pwd2"} value={this.state.pwd2} onChange={this.handleValueChange}/><br/>
                        <h4 color='red'>{this.state.check}</h4>
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

export default Register