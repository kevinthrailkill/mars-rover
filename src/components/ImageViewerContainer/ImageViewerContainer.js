import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import ImageGrid from '../ImageGrid/ImageGrid';

import { connect } from 'react-redux';
import { getRoverPhotos } from '../../actions';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },

  grow: {
    flexGrow: 1
  },

  colorPrimary: {
    backgroundColor: '#5D58F7',
    color: 'white'
  },
  barColorPrimary: {
    backgroundColor: '#00695C'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#5D58F7'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative'
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

/**
 * Main container component where all other components live
 */
class ImageViewerContainer extends Component {
  state = {
    mobileOpen: false,
    selectedRover: 'curiosity',
    selectedDate: new Date()
  };

  componentDidMount() {
    this.props.getRoverPhotos({
      rover: this.state.selectedRover,
      date: this.state.selectedDate
    });
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  /**
   * Handles the rover change and re searches based on search criteria
   */
  handleRoverChange = rover => {
    this.setState({ selectedRover: rover, mobileOpen: false }, () =>
      this.props.getRoverPhotos({
        rover: this.state.selectedRover,
        date: this.state.selectedDate
      })
    );
  };

  /**
   * Handles the date picker change and re searches based on search criteria
   */
  handleDateChange = date => {
    this.setState({ selectedDate: date, mobileOpen: false }, () =>
      this.props.getRoverPhotos({
        rover: this.state.selectedRover,
        date: this.state.selectedDate
      })
    );
  };

  render() {
    const { classes, photos, rovers, loading } = this.props;
    const { selectedDate } = this.state;

    const drawer = (
      <List>
        {rovers
          ? rovers.map(rover => (
              <ListItem
                button
                key={rover.roverName}
                onClick={() => this.handleRoverChange(rover.roverValue)}
              >
                <ListItemText primary={rover.roverName} />
              </ListItem>
            ))
          : null}
      </List>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              noWrap
              className={classes.grow}
            >
              Rover Photos
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                value={selectedDate}
                onChange={this.handleDateChange}
                maxDate={new Date()}
              />
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor="left"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div>
              <div className={classes.toolbar} />
              {drawer}
            </div>
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {loading ? (
            <LinearProgress
              classes={{
                colorPrimary: classes.colorPrimary,
                barColorPrimary: classes.barColorPrimary
              }}
            />
          ) : (
            <ImageGrid photos={photos} />
          )}
        </main>
      </div>
    );
  }
}

ImageViewerContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

/**
 * Map state to props
 */
const mapStateToProps = ({ mars }) => {
  const { photos, rovers, loading } = mars;

  return { photos, rovers, loading };
};

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { getRoverPhotos }
  )(ImageViewerContainer)
);
