import React, { Component } from 'react'
import Ship from '../../components/Ship'
import BlackFlag from '../../components/BlackFlag'
import {getPlayerPosition,ennemyPosition} from '../player_position'
import {battleFeedback} from '../batte-feedback'
import {ennemyShipInfo} from '../ennemy_ships'


export default class BasicShip extends Component {
    constructor(props) {
      super(props)
        this.x = this.props.x
        this.y = this.props.y

      this.state = {
         id : this.props.id
      }
    }


  render() {
    return (
        <Ship x={this.props.x} y={this.props.y} hp={100} id={this.state.id}
        onUpdate={function (state) {
             state.playerPosition.x= getPlayerPosition.x 
             state.playerPosition.y= getPlayerPosition.y 
          
                ennemyShipInfo.hp = state.hp
                ennemyPosition.x = state.x
                ennemyPosition.y = state.y
            
            
            console.log(ennemyPosition)
            
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

    )
  }
}
