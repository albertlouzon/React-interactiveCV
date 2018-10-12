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
                <BasicShip id={0} x={400} y={200} hp={50}/>
                <BasicShip id={1} x={200} y={350} hp={30}/>
                <BasicShip id={2} x={800} y={400} hp={80}/>
                <BasicShip id={3} x={700} y={200} hp={60}/>
                <ManiatisShip id={4} x={400} y={500} hp={30}/>
            </Game>


        )
    }
}
