import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    height: '90%'
  },
  gridList: {
    maxWidth: '100%'
  }
});

const ImageGrid = props => {
  const { classes, photos } = props;

  if (photos === null) {
    return null;
  }

  if (photos.length === 0) {
    return (
      <div className={classes.root}>
        <Typography variant="title" color="inherit" noWrap>
          No Photos For The Selected Rover On The Selected Date
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} cols={1}>
        {photos.map(photo => (
          <GridListTile key={photo.id} cols={1}>
            <img
              src={photo.img_src}
              alt={photo.id}
              style={{ width: '100%', maxWidth: '100%', height: 'auto' }}
            />
            <GridListTileBar
              title={'Date Taken: ' + photo.earth_date}
              subtitle={<span>by: {photo.rover.name}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

ImageGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ImageGrid);
