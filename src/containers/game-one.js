import React, { Component } from 'react'
import Game from '../components/Game';
import Background from '../components/Background'
import MainShip from './player_ships/main_ship';
import BasicShip from '../containers/ennemies/basic_ship'
import ManiatisShip from '../containers/ennemies/maniatis_ship'

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
                <BasicShip id={0} x={400} y={200} hp={20}/>
                  <BasicShip id={1} x={256} y={775} hp={70}/><BasicShip id={4} x={700} y={125} hp={60}/>
                <BasicShip id={2} x={1000} y={650} hp={20}/>
                <ManiatisShip id={3} x={600} y={400} hp={40}/>
                <ManiatisShip id={5} x={900} y={700} hp={40}/>
            </Game>


        )
    }
}
