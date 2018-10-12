import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
    width:'70%',
    marginLeft:'15%'
  },
};

//Calcul de la diff a enlever par shot : diff = damage/N * 100 avec damage le nbe de pt de vie enlevé par shot, et N le nombre total de hp
let shotDamage = 10

class HealthBar extends React.Component {
 constructor(props) {
   super(props)
    this.hp = this.props.hp
    this.shouldUpdate = this.props.shouldUpdate
    this.isTouchey = this.props.isTouchey
    this.hpMax = this.props.hpMax
 }
 
  state = {
    completed: 100,
  };
200
  componentDidMount() {  
        this.timer = setInterval(this.progress, 90);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  progress = () => {
    const { completed } = this.state;
        if(this.props.shouldUpdate===true){
            let diff = shotDamage/this.props.hpMax*100
            this.setState({ completed: completed - diff});
        }

  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LinearProgress color="secondary" variant="determinate" value={this.state.completed} />
      </div>
    );
  }
}

HealthBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HealthBar);