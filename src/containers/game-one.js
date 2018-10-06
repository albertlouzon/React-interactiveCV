import React, { Component } from 'react'
import Game from '../components/Game';
import Ship from '../components/Ship'
import Background from '../components/Background'
import BlackFlag from '../components/BlackFlag'
import KeyEvent from '../components/KeyEvent'
import Hit from '../components/Hit'
import AnimatedPirateShip from '../components/AnimatedPirateShip'
import MainShip from './player_ships/main_ship';
import {ennemyPosition, getPlayerPosition} from './player_position'
import {ennemyShipInfo} from './ennemy_ships'
import {battleFeedback} from './batte-feedback'

export default class FinalGame extends Component {

   
    constructor(props) {
      super(props)
    
      this.state = {
      }
    }


    render() {
        return (

            <Game>

                <Background />  
            
                <MainShip/>
                
                <Ship x={100} y={100} hp={100}
                onUpdate={function (state) {
                     state.playerPosition.x= getPlayerPosition.x 
                     state.playerPosition.y= getPlayerPosition.y 
                    ennemyShipInfo.hp = state.hp
                    ennemyPosition.x = state.x
                    ennemyPosition.y = state.y
                   if (getPlayerPosition.x - state.x < 250  &&  getPlayerPosition.x - state.x > -250 &&  getPlayerPosition.y - state.y > -250 &&  getPlayerPosition.y - state.y < 250 ){
                       state.playerDetected = true
                       //player is spotted
                   }
                 
                   //ship is touchey    
                    if(battleFeedback.XYsuccess==true && state.hp > 0){ 
                        state.hp = state.hp - 10
                        state.isTouchey = true
                        battleFeedback.XYsuccess = false
                    }

                    if (state.x >= 300 && state.moveRight) {
                        return {
                            moveLeft: true,
                            moveRight: false,
                            
                        }
                    }

                    if (state.x <= 100 && state.moveLeft) {
                        return {
                            moveLeft: false,
                            moveRight: true
                        }
                    }
                    if (state.y <= 300 && state.moveUp) {
                        return {
                            moveLeft: false,
                            moveRight: false,
                            moveUp: true
                        }
                    }

                    if (state.moveUp) {
                        return {
                            y: state.y + 2
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


                <Ship x={200} y={450} hp={800} onUpdate={function (state) {
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
