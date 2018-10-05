import React, { Component } from 'react'
import Game from '../components/Game';
import Ship from '../components/Ship'
import Background from '../components/Background'
import BlackFlag from '../components/BlackFlag'
import KeyEvent from '../components/KeyEvent'
import AnimatedPirateShip from '../components/AnimatedPirateShip'
import Cannonball from '../components/Cannonball'

import Key from '../Key'
import MainShip from './player_ships/main_ship';



export default class FinalGame extends Component {
    render() {
        return (
            <Game>
                <Background />
                <MainShip/>
                
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
