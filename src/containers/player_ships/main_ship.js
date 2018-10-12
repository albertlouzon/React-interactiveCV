import React, { Component } from 'react'
import Ship from '../../components/Ship'
import KeyEvent from '../../components/KeyEvent'
import Cannonball from '../../components/Cannonball'
import Key from '../../Key'
import { getPlayerPosition, cannonBallPosition, ennemyPosition } from '../player_position'
import { battleFeedback,battleEnnemyFeedback } from '../batte-feedback'

const newState = {}; //for direction index. bot=0 ; right = 2 ; top = 4 ; left = 6
const cannonSpeed = 3
let direction
let isPlayerShooting = false
let xOrY 
let tamerlapute =""

//préparation pour quand yaura plusieurs bateaux avec different heught et width.
let targetSize = {
    equation1 : { 
        min : 0,
        max : 0
    },
    equation2 : { 
        min : 0,
        max : 0
    }
}

let heroCanonRange = -90

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
                        if (tamerlapute==="X"){

                            xOrY = state.x
                        }else {xOrY=state.y
                        }
                        isPlayerShooting = true
                        if (battleFeedback.Xsuccess == true && battleFeedback.Ysuccess == true) {
                            battleFeedback.XYsuccess = true
                            battleFeedback.Xsuccess = false
                            battleFeedback.Ysuccess = false
                            isPlayerShooting = false
                            return { isShooting: false, visible: false, x:40 };
                        } else {
                            battleFeedback.Xsuccess = false
                            battleFeedback.Ysuccess = false
                        }
                        if (xOrY < heroCanonRange) {
                            isPlayerShooting = false
                            return { isShooting: false, visible: false, x:40 };
                        } else {
                           
                            if (state.weapon === 'left') {
                               
                                battleFeedback.Xsuccess = false
                                battleFeedback.Ysuccess = false
                                let shootEquation1
                                let shootEquation2

                                for(var ship in ennemyPosition){
                                    if(tamerlapute==='X'){
                                        cannonBallPosition.x = getPlayerPosition.x + state.x
                                        cannonBallPosition.y = getPlayerPosition.y
                                        shootEquation1 = cannonBallPosition.y - ennemyPosition[ship][1]
                                        shootEquation2 = cannonBallPosition.x - ennemyPosition[ship][0]
                                        targetSize.equation1.min = -20
                                        targetSize.equation1.max = 30
                                        targetSize.equation2.min = 15
                                        targetSize.equation2.max = 86

                                        
                                    }else {
                                        cannonBallPosition.x = getPlayerPosition.x
                                        cannonBallPosition.y = getPlayerPosition.y + state.y
                                        shootEquation1 = cannonBallPosition.y - ennemyPosition[ship][1]
                                        shootEquation2 = cannonBallPosition.x - ennemyPosition[ship][0]
                                        targetSize.equation1.min = 50
                                        targetSize.equation1.max = 70
                                        targetSize.equation2.min = -30
                                        targetSize.equation2.max = 30
                                       
                                    }

                                    if (shootEquation1 >= targetSize.equation1.min  && shootEquation1 <= targetSize.equation1.max ) {
                                        battleFeedback.Ysuccess = true
                                        if (shootEquation2 >= targetSize.equation2.min && shootEquation2  <=  targetSize.equation2.max) {
                                            battleFeedback.Xsuccess = true
                                            battleFeedback.shipId = ship
                                        }
                                    }


                                }














                            }  if (state.weapon === 'right') {
                                battleFeedback.Xsuccess = false
                                battleFeedback.Ysuccess = false
                                let shootEquation1
                                let shootEquation2
                                //cette loop n'est peut etre pas necessaire
                                for(var ship in ennemyPosition){
                                    if(tamerlapute==='X'){
                                        cannonBallPosition.x = getPlayerPosition.x - state.x
                                        cannonBallPosition.y = getPlayerPosition.y
                                        shootEquation1 = cannonBallPosition.y - ennemyPosition[ship][1]
                                        shootEquation2 = cannonBallPosition.x - ennemyPosition[ship][0]
                                        targetSize.equation1.min = -20
                                        targetSize.equation1.max = 30
                                        targetSize.equation2.min =  -82
                                        targetSize.equation2.max = -30
                                    }else {
                                        cannonBallPosition.x = getPlayerPosition.x
                                        cannonBallPosition.y = getPlayerPosition.y - state.y
                                        shootEquation1 = cannonBallPosition.x - ennemyPosition[ship][0]
                                        shootEquation2 = cannonBallPosition.y - ennemyPosition[ship][1]
                                        targetSize.equation1.min = -45
                                        targetSize.equation1.max = 30
                                        targetSize.equation2.min =  -70
                                        targetSize.equation2.max = -35
                                    }
                                    if (shootEquation1 >= targetSize.equation1.min  && shootEquation1 <= targetSize.equation1.max) {
                                        battleFeedback.Ysuccess = true
                                        if (shootEquation2 >= targetSize.equation2.min && shootEquation2 <= targetSize.equation2.max) {
                                            battleFeedback.Xsuccess = true
                                            battleFeedback.shipId = ship
                                        }
                                    }
                                }
                               

                            }

                            if(newState.directionIndex===0 || newState.directionIndex===4){
                                tamerlapute = "X"
                                direction = state.x - cannonSpeed
                                return  {x:direction}

                            }else if (newState.directionIndex===2 || newState.directionIndex===6){
                                tamerlapute = "Y"
                                direction = state.y - cannonSpeed
                                return  {y:direction}
                            }
                          
                        }
                    }
                }}>
                    <KeyEvent onDown={function (keyCodes, state) {
                        //invoke shooting on pressing these keys
                        if (keyCodes.indexOf(Key.a) >= 0) {
                            if(isPlayerShooting===false){
                                return { isShooting: true, visible: true, y: 40, weapon: 'left' }
                            }
                            ;
                        }
                        if (keyCodes.indexOf(Key.e) >= 0) {
                            if(isPlayerShooting===false){
                                return { isShooting: true, visible: true, y: 40, weapon: 'right' };

                            }
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

                    // if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.q) >= 0) {
                    //     if(isPlayerShooting===false){newState.directionIndex = 5}
                    // }

                    // if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                    //     if(isPlayerShooting===false){newState.directionIndex = 3}
                    // }

                    // if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.a) >= 0) {
                    //     if(isPlayerShooting===false){newState.directionIndex = 7}
                    // }

                    // if (keyCodes.indexOf(Key.s) >= 0 && keyCodes.indexOf(Key.d) >= 0) {
                    //     if(isPlayerShooting===false){newState.directionIndex = 1}
                    // }
                    


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

