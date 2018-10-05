import React, { Component } from "react";
import PropTypes from 'prop-types'
import Matter from "matter-js";
import Input from "../Input";
import KeyEvent from "./KeyEvent";

class Cannonball extends Component {
  constructor(props) {
    super(props);

    this.state = {
      x: props.x,
      y: props.y,
      isShooting: false,
      visible: props.visible,
      weapon : props.weapon
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

    if (onUpdate && typeof onUpdate === "function") {
      const onUpdateResult = onUpdate(this.state);

      if (onUpdateResult) {
        this.setState((prevState) => {
          return { ...prevState, ...onUpdateResult };
        });
      }
    }
  }

  render() {
    const { children } = this.props;
    if(this.state.weapon == "left" ){
      return (
        <div style={{
          display: (this.state.visible) ? "block" : "none",
          position: "absolute",
          left: this.state.x,
          top: this.state.y,
          backgroundImage: "url('../../assets/cannonball2.png')",    
          backgroundSize: "contain",
          width: 40,
          height: 40 }}
        >{children}</div>
      );

    }
    else {
      return (
        <div style={{
          display: (this.state.visible) ? "block" : "none",
          position: "absolute",
          left: this.state.x,
          bottom: this.state.y,
          backgroundImage: "url('../../assets/cannonball2.png')",    
          backgroundSize: "contain",
          width: 40,
          height: 40 }}
        >{children}</div>
      );

    }
   
  }
}

Cannonball.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  children: PropTypes.node,
  visible: PropTypes.bool,
  onUpdate: PropTypes.func
};

Cannonball.contextTypes = {
  engine: PropTypes.object
};

Cannonball.defaultProps = {
  visible: true
};

export default Cannonball;
