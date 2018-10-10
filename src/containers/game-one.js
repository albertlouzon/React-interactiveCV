import React, { Component } from 'react'
import Game from '../components/Game';
import Background from '../components/Background'
import MainShip from './player_ships/main_ship';
import BasicShip from '../containers/ennemies/basic_ship'
import CopyShip from './ennemies/copy_ship';

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
                <BasicShip id={0} x={400} y={200}/>
                <BasicShip id={1} x={555} y={555}/>
                <BasicShip id={2} x={50} y={125}/>

            </Game>


        )
    }
}
