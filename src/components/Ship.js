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
import {battleFeedback} from '../containers/batte-feedback'
import { ennemyShipInfo } from "../containers/ennemy_ships";
import { getPlayerPosition } from "../containers/player_position";
import HealthBar from './healthBar'

const WIDTH = 120;
const HEIGHT = 120;

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
      isDestroyed : false,
      background : "url('../../assets/ship_rotate.png')",
      display:'inline',
      opacity:1
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

  update() {
    if(this.state.isDestroyed===true){

    }else {
      const { onUpdate } = this.props;
      if(this.state.isTouchey == true){
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
      opacity:this.state.opacity

    };

    React.Children.forEach(children, (child) => {
      if (child.type === BlackFlag) {
        styles.backgroundImage ="url('../../assets/ship_pirate.png')";
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


