import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Body } from "react-game-kit";
import Matter from "matter-js";
import BlackFlag from "./BlackFlag";
import Maniatis from './Maniatis'
import PhysicsBody from "./PhysicsBody";
import Hit from "./Hit";
import KeyEvent from "./KeyEvent";
import Input from "../Input"; 
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HealthBar from './healthBar'
import { isGameStarted } from "../containers/décor/island";

export let kills
kills = 0
const WIDTH = 120;
const HEIGHT = 120;
let grossePute = false


class Ship extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.id,
      x: props.x,
      y: props.y,
      directionIndex: props.directionIndex,
      moveLeft: false,
      moveRight: true,
      moveUp : false,
      hasPhysics: false,
      hpMax:props.hp,
      hp:props.hp,
      isTouchey : false,
      updateHealthBar:false,
      playerDetected : false,
      playerPosition : {},
      webKitFilter: '',
      filter : '',
      isDestroyed : this.props.isDestroyed,
      background : "url('../../assets/ship_rotate.png')",
      display:'inline',
      TEPU:'none',
      open:false
    };

    this.update = this.update.bind(this);
  }

  componentDidMount() {
    React.Children.forEach(this.props.children, (child) => {
      if (child.type === KeyEvent) {
        const { onDown, onUp } = child.props;

        Input.key.on("down", (keyCode) => {
          if (onDown && typeof onDown === "function") {
            const onDownResult = onDown(keyCode, this.state);

            if (onDownResult) {
              this.setState((prevState) => {
                return { ...prevState, ...onDownResult };
              });
            }
          }
        });

        Input.key.on("up", (keyCode) => {
          if (onUp && typeof onUp === "function") {
            const onUpResult = onUp(keyCode, this.state);

            if (onUpResult) {
              this.setState((prevState) => {
                return { ...prevState, ...onUpResult };
              });
            }
          }
        });
      }
    });
    Matter.Events.on(this.context.engine, "afterUpdate", this.update);
  }

  
  componentWillUnmount() {
    Matter.Events.off(this.context.engine, "afterUpdate", this.update);

    Input.key.off("down");
    Input.key.off("up");
  }


  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  update() {
    if(kills==2 && grossePute == false){
      this.handleClick()
      grossePute=true
    }

    if(isGameStarted==true){
      this.setState({
        TEPU:'inline',
      })

    }
    else if(isGameStarted==false){
      this.setState({
        TEPU:'none',
      })

    }
    if(this.state.TEPU==='none'){

    }else {
      const { onUpdate } = this.props;
      if(this.state.isTouchey == true){
        if(this.state.hp===0){
          kills = kills + 1
        }
        const filter = "brightness(2.5) hue-rotate(-60deg)";
        this.setState({
          webKitFilter : filter,
          filter: filter,
          updateHealthBar:true
        })
        setTimeout(() => {
          this.setState({
            isTouchey:false
          })
        }, 40);
        setTimeout(() => {
          this.setState({
            updateHealthBar:false
          })
        }, 100);
      }else { 
        this.setState({
          webKitFilter : '',
          filter: ''
        })
      }
  
      if (this.state.hp == 0){

        this.setState({
          hp:'destroyed',
          background : '',
          display:'none',
          opacity:0,
          x:0,
          y:0
        })
      }
      if (onUpdate && typeof onUpdate === "function") {
        const onUpdateResult = onUpdate(this.state);
  
        if (onUpdateResult) {
          this.setState((prevState) => {
            return { ...prevState, ...onUpdateResult };
          });
        }
      }
  
      if (this.body.body) {
        Matter.Body.setVelocity(this.body.body, { x: this.state.x, y: this.state.y });
      }
    }
    }
   

  render() {
    const { children } = this.props;

    const styles = {
      display:this.state.display,
      position: "absolute",
      left: this.state.x,
      top: this.state.y,
      backgroundImage: this.state.background,
      backgroundSize: "cover",
      backgroundPosition: `0px ${this.state.directionIndex * (-HEIGHT)}px`,
      backgroundRepeat:'repeat',
      width: WIDTH,
      height: HEIGHT,
      filter:this.state.filter,
      webKitFilter : this.state.webKitFilter,
      opacity:this.state.opacity,
      zIndex:1

    };

    React.Children.forEach(children, (child) => {
      if (child.type === BlackFlag) {
        styles.backgroundImage ="url('../../assets/ship_pirate.png')";
        styles.display=this.state.TEPU
      }

      if (child.type === Maniatis) {
        styles.backgroundImage ="url('../../assets/Ships/viking/boat.png')";
        styles.backgroundSize = 'contain'
        styles.backgroundPosition='center'
        styles.height = HEIGHT/1.2
      }

      if (child.type === Hit) {
        const filter = "brightness(2.5) hue-rotate(-60deg)";

        styles.filter = filter;
        styles.WebkitFilter = filter;
      }

      if (child.type === PhysicsBody) {
        this.setState({
          hasPhysics: true
        });
      }
      else return null 
    });

    // if (this.state.hasPhysics) {
      return (
        <div style={styles}>
          <Body
            args={[this.state.x, this.state.y, WIDTH, HEIGHT]}
            ref={(b) => this.body = b }
          >
            <div>
            <HealthBar hp={this.state.hp} shouldUpdate={this.state.updateHealthBar} isTouchey={this.state.isTouchey} hpMax={this.state.hpMax}/>
              {children}
            </div>
          </Body>



        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Well played !!!</span>}
          action={[
            
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        </div>
      );
    // }

    return (
      <div style={styles}>{children}</div>
    );
  }
}

Ship.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  directionIndex: PropTypes.number,
  children: PropTypes.node,
  onUpdate: PropTypes.func
};

Ship.contextTypes = {
  engine: PropTypes.object
};

Ship.defaultProps = {
  x: 0,
  y: 0,
  directionIndex: 7
};

export default Ship;


