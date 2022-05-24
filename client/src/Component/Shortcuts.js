import React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    btn: {
        marginRight: 10
    }
})

class Shortcuts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleShortcut = (e) => {
        window.open(this.props.shortcutsURL)
    }

    handleClickOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    deleteUserData(id) {
        const url = '/api/users/' + id;
        fetch(url, {
            method: 'delete'
        });
        this.props.setRefresh();
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
                <Button className={classes.btn} variant={"contained"} color={'primary'} onClick={this.handleShortcut}>바로가기</Button>
                <Button variant={"contained"} color={'secondary'} onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 데이터가 삭제됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteUserData(this.props.index)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default withStyles(styles)(Shortcuts)