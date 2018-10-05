import React, { Component } from 'react'
import Game from '../components/Game';
import Ship from '../components/Ship'
import Background from '../components/Background'
import BlackFlag from '../components/BlackFlag'
import KeyEvent from '../components/KeyEvent'
import AnimatedPirateShip from '../components/AnimatedPirateShip'
import Cannonball from '../components/Cannonball'

import Key from '../Key'



export default class FinalGame extends Component {
    render() {
        return (
            <Game>
                <Background />
                <Ship x={10} y={10}>
                    <Cannonball x={40} y={40} visible={false} onUpdate={function (state) {
                        if (state.isShooting) {
                            if (state.y <= -40) {
                                return { isShooting: false, visible: false };
                            } else {
                                return { y: state.y - 2 };
                            }
                        }
                    }}>
                        <KeyEvent onDown={function (keyCodes, state) {
                            if (keyCodes.indexOf(Key.a) >= 0) {
                                return { isShooting: true, visible: true, y: 40 };
                            }
                        }} />
                    </Cannonball>
                    <KeyEvent onDown={function (keyCodes, state) {
                        const newState = {};

                        if (keyCodes.indexOf(Key.z) >= 0) {
                            newState.y = state.y - 4;
                            newState.directionIndex = 4;
                        }

                        if (keyCodes.indexOf(Key.s) >= 0) {
                            newState.y = state.y + 4;
                            newState.directionIndex = 0;
                        }

                        if (keyCodes.indexOf(Key.q) >= 0) {
                            newState.x = state.x - 4;
                            newState.directionIndex = 6;
                        }

                        if (keyCodes.indexOf(Key.d) >= 0) {
                            newState.x = state.x + 4;
                            newState.directionIndex = 2;
                        }

                        if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.a) >= 0) {
                            newState.directionIndex = 5;
                        }

                        if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                            newState.directionIndex = 3;
                        }

                        if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.a) >= 0) {
                            newState.directionIndex = 7;
                        }

                        if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                            newState.directionIndex = 1;
                        }

                        return newState;
                    }} />
                </Ship>
                
                <Ship x={200} y={100} onUpdate={function (state) {
                    if (state.x >= 300 && state.moveRight) {
                        return {
                            moveLeft: true,
                            moveRight: false
                        }
                    }

                    if (state.x <= 100 && state.moveLeft) {
                        return {
                            moveLeft: false,
                            moveRight: true
                        }
                    }

                    if (state.moveRight) {
                        return {
                            x: state.x + 1
                        }
                    }

                    if (state.moveLeft) {
                        return {
                            x: state.x - 1
                        }
                    }
                }}>
                    <BlackFlag />
                </Ship>


                <Ship x={200} y={450} onUpdate={function (state) {
                    if (state.x >= 400 && state.moveRight) {
                        return {
                            moveLeft: true,
                            moveRight: false
                        }
                    }

                    if (state.x <= 200 && state.moveLeft) {
                        return {
                            moveLeft: false,
                            moveRight: true
                        }
                    }

                    if (state.moveRight) {
                        return {
                            x: state.x + 1
                        }
                    }

                    if (state.moveLeft) {
                        return {
                            x: state.x - 1
                        }
                    }
                }}>
                    <BlackFlag />
                </Ship>
            </Game>



        )
    }
}
