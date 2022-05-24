import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Shortcuts from './Shortcuts';
import AddUserData from "./AddUserData";

const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 1080,
        flexGrow: 1
    },
    paper: {
        marginLeft: 300,
        marginRight: 300,
        marginTop: 100
    },
    container: {
        maxHeight: 440
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
    },
});

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 10,
            userData: [],
        }
    }

    handleChangePage = (e, newPage) => {
        this.setState({page: newPage});
    }

    handleChangeRowsPerPage = (e) => {
        this.setState({
            rowsPerPage: e.target.value,
            page: 0
        })
    }

    setRefresh = () => {
        this.setState({
            page: 0,
            rowsPerPage: 10,
            userData: []
        });
        this.callApi()
            .then(res => this.setState({userData: res}))
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.callApi()
            .then((res) => {
                this.setState({userData: res});
                console.log(this.state.userData);
            })
    }

    callApi = async () => {
        const res = await fetch('api/users');
        const body = await res.json();
        return body;
    }

    render() {
        const {classes} = this.props;
        let searchKeyword = this.props.searchKeyword();
        const searchKey = (data) => {
            let b = false;
            if(data.id.indexOf(searchKeyword) > -1 || data.site.indexOf(searchKeyword) > -1) {
                b = true;
            }
            return b;
        }
        const columns = [
            { id: 'id', label: 'ID', minWidth: 170},
            { id: 'pwd', label: 'PWD', minWidth: 170},
            { id: 'site', label: 'Site', minWidth: 170},
            { id: 'option', label: 'Option', minWidth: 0}
        ];

        return(
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.userData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((data) => {
                                    let key = searchKey(data);
                                    return(
                                        key === true ? <TableRow hover role={'checkbox'} tabIndex={-1} >
                                            {columns.map((column) => {
                                                const value = data[column.id];
                                                return (
                                                    <TableCell>
                                                        {column.id !== "option" ? value : <Shortcuts setRefresh={this.setRefresh} shortcutsURL={data.site} index={data.index} /> }
                                                    </TableCell>
                                                )
                                            })}
                                        </TableRow> : null

                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.userData.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
                <div className={classes.menu}>
                    <AddUserData setRefresh={this.setRefresh}/>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(UserPage)