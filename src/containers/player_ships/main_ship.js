import React, { Component } from 'react'
import Ship from '../../components/Ship'
import KeyEvent from '../../components/KeyEvent'
import Cannonball from '../../components/Cannonball'
import Key from '../../Key'
import { getPlayerPosition, cannonBallPosition, ennemyPosition } from '../player_position'
import { battleFeedback,battleEnnemyFeedback } from '../batte-feedback'

const newState = {}; //for direction index. bot=0 ; right = 2 ; top = 4 ; left = 6
const cannonSpeed = 3
let axis
let direction
let isPlayerShooting = false

export default class MainShip extends Component {


    render() {
        return (
            <Ship x={10} y={10} hp={500} onUpdate={function(state){
                if(battleEnnemyFeedback.XYsuccess==true && state.hp > 0){ 
                    state.hp = state.hp - 1
                    state.isTouchey = true
                    battleEnnemyFeedback.XYsuccess = false
                }
            }}>
                <Cannonball canon='first' x={40} y={40} visible={false} onUpdate={function (state) {
                    if (state.isShooting) {
                        isPlayerShooting = true
                        if (battleFeedback.Xsuccess == true && battleFeedback.Ysuccess == true) {
                            battleFeedback.XYsuccess = true
                            battleFeedback.Xsuccess = false
                            battleFeedback.Ysuccess = false
                            return { isShooting: false, visible: false };
                        } else {
                            battleFeedback.Xsuccess = false
                            battleFeedback.Ysuccess = false
                        }
                        console.log(axis)
                        if (state.y < -100) {
                            isPlayerShooting = false
                            return { isShooting: false, visible: false, x:40,y:40 };
                        } else {
                            console.log(state.y)
                            cannonBallPosition.x = getPlayerPosition.x
                            if (state.weapon === 'left') {
                                cannonBallPosition.y = getPlayerPosition.y + state.y
                                battleFeedback.Xsuccess = false
                                battleFeedback.Ysuccess = false

                                for(var ship in ennemyPosition){
                                    if (cannonBallPosition.y - ennemyPosition[ship][1] <= 70 && cannonBallPosition.y - ennemyPosition[ship][1]  >= 50) {
                                        battleFeedback.Ysuccess = true
                                        if (cannonBallPosition.x - ennemyPosition[ship][0]  >= -30 && cannonBallPosition.x - ennemyPosition[ship][0]  <= 25) {
                                            battleFeedback.Xsuccess = true
                                            battleFeedback.shipId = ship
                                        }
                                    }


                                }
                                
                                

                            }  if (state.weapon === 'right') {
                                cannonBallPosition.y = getPlayerPosition.y - state.y
                                battleFeedback.Xsuccess = false
                                battleFeedback.Ysuccess = false
                                for(var ship in ennemyPosition){
                                    if (cannonBallPosition.y - ennemyPosition[ship][1] >= -95 && cannonBallPosition.y - ennemyPosition[ship][1] <= -75) {
                                        battleFeedback.Ysuccess = true
                                        if (cannonBallPosition.x - ennemyPosition[ship][0] >= -30 && cannonBallPosition.x - ennemyPosition[ship][0] <= 30) {
                                            battleFeedback.Xsuccess = true
                                            battleFeedback.shipId = ship
                                        }
                                    }
                                }
                               

                            }
                           return  {y : state.y - 3 }
                        }
                    }
                }}>
                    <KeyEvent onDown={function (keyCodes, state) {
                        if (keyCodes.indexOf(Key.a) >= 0) {
                            direction = state.y - cannonSpeed
                            if(newState.directionIndex===0){
                                axis = state.y
                            }else if(newState.directionIndex===2){
                                axis = state.x
                            }else if(newState.directionIndex===4){
                                axis = state.y
                            }else if(newState.directionIndex===6){
                                axis = state.x
                            }
                            return { isShooting: true, visible: true, y: 40, weapon: 'left' };
                        }
                        if (keyCodes.indexOf(Key.e) >= 0) {
                            direction = state.y + cannonSpeed
                            return { isShooting: true, visible: true, y: 40, weapon: 'right' };
                        }
                    }} />
                </Cannonball>
                <KeyEvent onDown={function (keyCodes, state) {
                    const speed = 5
                        
                    if (keyCodes.indexOf(Key.z) >= 0) {
                        newState.y = state.y - speed;
                        if(isPlayerShooting===false){newState.directionIndex = 4;}
                    }

                    if (keyCodes.indexOf(Key.s) >= 0) {
                        newState.y = state.y + speed;
                        if(isPlayerShooting===false){newState.directionIndex = 0}
                    }

                    if (keyCodes.indexOf(Key.q) >= 0) {
                        newState.x = state.x - speed;
                        if(isPlayerShooting===false){newState.directionIndex = 6}
                    }

                    if (keyCodes.indexOf(Key.d) >= 0) {
                        newState.x = state.x + speed;
                        if(isPlayerShooting===false){newState.directionIndex = 2}
                    }

                    if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.q) >= 0) {
                        if(isPlayerShooting===false){newState.directionIndex = 5}
                    }

                    if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                        if(isPlayerShooting===false){newState.directionIndex = 3}
                    }

                    if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.a) >= 0) {
                        if(isPlayerShooting===false){newState.directionIndex = 7}
                    }

                    if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                        if(isPlayerShooting===false){newState.directionIndex = 1}
                    }
                    


                    if (keyCodes.indexOf(Key.z) >= 0 || keyCodes.indexOf(Key.d) >= 0 || keyCodes.indexOf(Key.q) >= 0 || keyCodes.indexOf(Key.s) >= 0) {
                        getPlayerPosition.y = state.y;
                        getPlayerPosition.x = state.x;
                    }
                    return newState;
                }} />
            </Ship>
        )
    }
}


//la direction dépend de la touche cliqué et non de l'axe. il faut changer l'endroit ou on assigne la valeur 
/// pour l'instant return state.y et id state.y < 100 sotn hardocé

