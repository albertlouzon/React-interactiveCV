import React, { Component } from 'react'
import Game from '../components/Game';
import Background from '../components/Background'
import MainShip from './player_ships/main_ship';
import BasicShip from '../containers/ennemies/basic_ship'

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
                <BasicShip id={1} x={400} y={200}/>
            </Game>


        )
    }
}
