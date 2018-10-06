import React, { Component } from 'react'
import Ship from '../../components/Ship'
import KeyEvent from '../../components/KeyEvent'
import Cannonball from '../../components/Cannonball'
import Key from '../../Key'
import {getPlayerPosition,cannonBallPosition,ennemyPosition} from '../player_position'
import {battleFeedback} from '../batte-feedback'



export default class MainShip extends Component {

    
  render() {
    return (
        <Ship x={10} y={10} hp={150}>
        <Cannonball x={40} y={40} visible={false} onUpdate={function (state) {
            if (state.isShooting) {
                if (state.y <= -90) {
                    if ( battleFeedback.Xsuccess == true  && battleFeedback.Ysuccess == true){
                        battleFeedback.XYsuccess = true
                        console.log('final touché')
                        battleFeedback.Xsuccess = false
                        battleFeedback.Ysuccess = false
                    }else {
                        battleFeedback.Xsuccess = false
                        battleFeedback.Ysuccess = false
                    }
                    return { isShooting: false, visible: false };
                } else {
                    cannonBallPosition.x = getPlayerPosition.x
                    cannonBallPosition.y = getPlayerPosition.y +  state.y - ennemyPosition.y
                 
                    if(cannonBallPosition.y >= ennemyPosition.y -3 && cannonBallPosition.y <= ennemyPosition.y + 3){
                        battleFeedback.Ysuccess = true
                    }

                    if(cannonBallPosition.x >= ennemyPosition.x -3 && cannonBallPosition.x <= ennemyPosition.x +3){
                        battleFeedback.Xsuccess = true
                    }
                    return { y: state.y - 3 };
                }
            }
        }}>
            <KeyEvent onDown={function (keyCodes, state) {
                if (keyCodes.indexOf(Key.a) >= 0) {
                    return { isShooting: true, visible: true, y: 40, weapon:'left' };
                }
                 if (keyCodes.indexOf(Key.e) >= 0) {
                    return { isShooting: true, visible: true, y: 40, weapon:'right' };
                }
            }} />
        </Cannonball>
        <KeyEvent onDown={function (keyCodes, state) {
            const newState = {};
            if (keyCodes.indexOf(Key.p) >= 0) {
                console.log('player is at :',getPlayerPosition)
                console.log('cannonball is at :',cannonBallPosition)
                console.log('annemy is at :',ennemyPosition)
            }


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

            if (keyCodes.indexOf(Key.z) >= 0 && keyCodes.indexOf(Key.q) >= 0) {
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

            
            if (keyCodes.indexOf(Key.z) >= 0 || keyCodes.indexOf(Key.d) >= 0 || keyCodes.indexOf(Key.q) >= 0 || keyCodes.indexOf(Key.s) >= 0 ) {
                getPlayerPosition.y = state.y;
                getPlayerPosition.x = state.x ;
            }
            return newState;
        }} />
    </Ship>
    )
  }
}
