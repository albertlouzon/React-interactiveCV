import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MissionIcon from '@material-ui/icons/Assignment'
import TechIcon from '@material-ui/icons/ScatterPlot'
import CclIcon from '@material-ui/icons/InsertEmoticon'


const description = {
    mission : "During my internship at Indoor-Robotics, a startup whose thrilling project is to create autonomous security drones, I had the chance to build the client-side web application from scratch. From the App Architecture to the final testing stage ,this challenging task was the ideal way to gain a lot of experience in a few time",
    tech: <div >
        <pre style={{fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily:' "Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.46429em',color:'rgba(0,0,0,0.6)'}}>App architecture (uml-diagram)</pre>
        <pre style={{fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily:' "Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.46429em',color:'rgba(0,0,0,0.6)'}}>Basics of robotics (ROS)</pre>
        <pre style={{fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily:' "Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.46429em',color:'rgba(0,0,0,0.6)'}}>Front end implementation (React/Redux)</pre>
        <pre style={{fontSize: '0.875rem',
      fontWeight: 400,
      fontFamily:' "Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.46429em',color:'rgba(0,0,0,0.6)'}}>App testing + performance optimization</pre>

    </div>,


    ccl : 'The autonomy I had during the mission was a powerful way to step up in 2 months and to learn to solve the problems by myself.I really enjoyed being in charge of the frontend part of this project'
}


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InternshipResume(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      <ListItem>
        <Avatar  style={{backgroundColor:'#35baf6'}}>
          <MissionIcon />
        </Avatar>
        <ListItemText primary="My mission at Indoor" secondary={description.mission} />
      </ListItem>
      <li>
        <Divider variant="inset" />
      </li>
      <ListItem>
        <Avatar style={{backgroundColor:'#35baf6'}}>
          <TechIcon />
        </Avatar >
        <ListItemText primary="Technologies" secondary={description.tech} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <Avatar style={{backgroundColor:'#35baf6'}}>
          <CclIcon />
        </Avatar>
        <ListItemText primary="Conclusion" secondary={description.ccl} />
      </ListItem>
    </List>
  );
}

InternshipResume.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InternshipResume);