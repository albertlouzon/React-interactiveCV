import React, { Component } from 'react'
import Ship from '../../components/Ship'
import BlackFlag from '../../components/BlackFlag'
import {getPlayerPosition,ennemyPosition} from '../player_position'
import {battleFeedback, battleEnnemyFeedback} from '../batte-feedback'
import {ennemyShipInfo,ennemyCanonLocation} from '../ennemy_ships'
import Cannonball from '../../components/Cannonball'
import Maniatis from '../../components/Maniatis'


let cannonBallSpeed = 6 
let YrangeForShoot = 500
let XrangeForShoot = 120

export default class ManiatisShip extends Component {
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
        <Ship x={this.props.x} y={this.props.y} hp={this.props.hp} id={this.state.id}
        onUpdate={function (state) {
            if(state.isDestroyed === true){

            }else{
                state.playerPosition.x= getPlayerPosition.x 
                state.playerPosition.y= getPlayerPosition.y 
             
                   ennemyShipInfo.hp = state.hp
                   
                   let shipLocation = [state.x, state.y]
                   ennemyPosition[state.id] = shipLocation
                   if(state.hp=='destroyed'){
                       ennemyPosition[state.id] = [undefined,undefined]   
                      
                   }
              if (getPlayerPosition.x - state.x < 250  &&  getPlayerPosition.x - state.x > -250 &&  getPlayerPosition.y - state.y > -250 &&  getPlayerPosition.y - state.y < 250 ){
                  state.playerDetected = true
                  //player is spotted
              }
            
              //ship is touchey    
               if(battleFeedback.XYsuccess==true && state.hp > 0 && battleFeedback.shipId==state.id){ 
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
   
            }
           
        
        }}>

            <Maniatis />
            

             <Cannonball canon='second' id={this.state.id} x={40} y={40} visible={false} id={this.state.id} onUpdate={function (state) {
                  if (state.isShooting) {
                    
                    if (state.y <= -500) {
                       
                        return { isShooting: false, visible: false, y:40 };
                    } else {
                        ennemyCanonLocation.x = ennemyPosition[state.id][0] +30
                        if(state.weapon==='right'){
                            ennemyCanonLocation.y = ennemyPosition[state.id][1] - state.y
                            if(ennemyCanonLocation.y - getPlayerPosition.y > -45 && ennemyCanonLocation.y - getPlayerPosition.y <45){
                                battleEnnemyFeedback.Ysuccess = true
                                if(ennemyCanonLocation.x - getPlayerPosition.x > -41 && ennemyCanonLocation.x- getPlayerPosition.x <41){
                                    battleEnnemyFeedback.XYsuccess=true
                            
                                }else{
                                    battleEnnemyFeedback.Ysuccess = false

                                }
                            }
                        }
                        if(state.weapon==='left'){
                            ennemyCanonLocation.y = ennemyPosition[state.id][1] + state.y
                            if(ennemyCanonLocation.y - getPlayerPosition.y > -5 && ennemyCanonLocation.y - getPlayerPosition.y <90){
                                battleEnnemyFeedback.Ysuccess = true
                                if(ennemyCanonLocation.x - getPlayerPosition.x > -41 && ennemyCanonLocation.x- getPlayerPosition.x <41){
                                    battleEnnemyFeedback.XYsuccess=true
                            
                                }else {
                                    battleEnnemyFeedback.Ysuccess = false
                                }
                            }
                        }
                        return { y: state.y - cannonBallSpeed }
                    }
                }
                 if(ennemyPosition[state.id]){
                    if(ennemyPosition[state.id][0]-getPlayerPosition.x<XrangeForShoot && ennemyPosition[state.id][0]-getPlayerPosition.x>-XrangeForShoot){
                        if(ennemyPosition[state.id][1]-getPlayerPosition.y<YrangeForShoot && ennemyPosition[state.id][1]-getPlayerPosition.y>0)
                        //ennemy spotted the hero on the top side
                        return {isShooting:true, visible:true, weapon:'left'}
                        //spotted on the right side
                        else if (ennemyPosition[state.id][1]-getPlayerPosition.y>-YrangeForShoot && ennemyPosition[state.id][1]-getPlayerPosition.y<0){return {isShooting:true, visible:true, weapon:'right'}}
                    } 
                 }
               
            }}>
               
            </Cannonball>
        </Ship>

    )
  }
}
