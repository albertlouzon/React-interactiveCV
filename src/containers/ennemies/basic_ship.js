import React, { Component } from 'react'
import Ship from '../../components/Ship'
import BlackFlag from '../../components/BlackFlag'
import {getPlayerPosition,ennemyPosition} from '../player_position'
import {battleFeedback} from '../batte-feedback'
import {ennemyShipInfo} from '../ennemy_ships'
import Cannonball from '../../components/Cannonball'


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
                   // console.log('ennemy position test : ', ennemyPosition)
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

            <BlackFlag />
            

             <Cannonball x={40} y={40} visible={false} id={this.state.id} onUpdate={function (state) {
                  if (state.isShooting) {
                    if (state.y <= -110) {
                        return { isShooting: false, visible: false, y:40 };
                    } else {

                        return { y: state.y - 2 };
                    }
                }
                 if(ennemyPosition[state.id]){
                    if(ennemyPosition[state.id][0]-getPlayerPosition.x<30 && ennemyPosition[state.id][0]-getPlayerPosition.x>-30){
                        if(ennemyPosition[state.id][1]-getPlayerPosition.y<150 && ennemyPosition[state.id][1]-getPlayerPosition.y>0)
                        //ennemy spotted the hero on the top side
                        return {isShooting:true, visible:true, weapon:'left'}
                        else if (ennemyPosition[state.id][1]-getPlayerPosition.y>-150 && ennemyPosition[state.id][1]-getPlayerPosition.y<0){return {isShooting:true, visible:true, weapon:'right'}}
                    } 
                 }
               
            }}>
               
            </Cannonball>
        </Ship>

    )
  }
}
