import React from 'react';
import './App.css';
import UserPage from "./Component/UserPage";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomePage from "./Component/HomePage";
import MenuButton from "./Component/MenuButton";

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080,
    flexGrow: 1
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  progress: {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  btn: {
    margin: theme.spacing(1),
    justifyContent: 'center'
  },
  pTag: {
    marginLeft: '500',
    marginRight: '500'
  }
})

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      completed: 0,
      is_logined: false,
      userName: '',
      searchKeyword: ''
    }
  }

  componentDidMount() {
    this.callApi()
        .then((res) => {
          this.setState(res);
        })
        .catch(err => console.log(err))
  }

  setRefresh = () => {
    this.setState({
      completed: 0,
      is_logined: false,
      userName: '',
      searchKeyword: ''
    });
    this.callApi()
        .then(res => this.setState(res))
        .catch(err => console.log(err));
  }

  callApi = async () => {
    const res = await fetch('api/login');
    const body = await res.json();
    return body;
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  returnSearchKeyword = () => {
    return this.state.searchKeyword;
}

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root} >
          <AppBar position="static">
            <Toolbar>
              <MenuButton setRefresh={this.setRefresh} is_logined={this.state.is_logined} userName={this.state.userName} />
              <Typography className={classes.title} variant="h6" noWrap>
                Idgather {this.state.userName}
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                    placeholder="search..."
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    name={'searchKeyword'}
                    value={this.state.searchKeyword}
                    onChange={this.handleValueChange}
                />
              </div>
            </Toolbar>
          </AppBar>
          {this.state.is_logined === true ? <UserPage searchKeyword={this.returnSearchKeyword}/> : <HomePage setRefresh={this.setRefresh} />}
        </div>
    )
  }
}

export default withStyles(styles)(App)
