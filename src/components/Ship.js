import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Body } from "react-game-kit";
import Matter from "matter-js";
import BlackFlag from "./BlackFlag";
import PhysicsBody from "./PhysicsBody";
import Hit from "./Hit";
import KeyEvent from "./KeyEvent";
import Input from "../Input"; 
import {battleFeedback} from '../containers/batte-feedback'
import { ennemyShipInfo } from "../containers/ennemy_ships";
import { getPlayerPosition } from "../containers/player_position";

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
      hp:props.hp,
      isTouchey : false,
      playerDetected : false,
      playerPosition : {},
      webKitFilter: '',
      filter : ''
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
    const { onUpdate } = this.props;
    if(this.state.isTouchey == true){
      const filter = "brightness(2.5) hue-rotate(-60deg)";
      this.setState({
        webKitFilter : filter,
        filter: filter,
      })
      setTimeout(() => {
        this.setState({
          isTouchey:false
        })
      }, 40);
    }else { 
      this.setState({
        webKitFilter : '',
        filter: ''
      })
    }

    if (this.state.hp == 0){
      this.setState({
        hp:'destroyed'
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

  render() {
    const { children } = this.props;

    const styles = {
      position: "absolute",
      left: this.state.x,
      top: this.state.y,
      backgroundImage: "url('../../assets/ship_rotate.png')",
      backgroundSize: "cover",
      backgroundPosition: `0px ${this.state.directionIndex * (-HEIGHT)}px`,
      width: WIDTH,
      height: HEIGHT,
      filter:this.state.filter,
      webKitFilter : this.state.webKitFilter
    };

    React.Children.forEach(children, (child) => {
      if (child.type === BlackFlag) {
        styles.backgroundImage ="url('../../assets/ship_pirate.png')";
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
              {this.state.hp}
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
