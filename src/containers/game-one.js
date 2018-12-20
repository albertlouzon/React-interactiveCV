import React, { Component } from 'react'
import Game from '../components/Game';
import Background from '../components/Background'
import MainShip from './player_ships/main_ship';
import BasicShip from '../containers/ennemies/basic_ship'
import ManiatisShip from '../containers/ennemies/maniatis_ship'
import Island, { isGameStarted } from '../containers/décor/island'
import Tutorial from '../components/Modals/tutorial'
import { Button, Grid } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/WbCloudy'
import MobileDisplay from '../components/mobileDisplay'
import Hidden from '@material-ui/core/Hidden'
//RAJOUTER REACCT PDF DANS LE NPM

export default class FinalGame extends Component {


    constructor(props) {
        super(props)

        this.state = {
            gameTitle: 'Play / Stop game !'
        }
    }

    onOpening() {
        window.open(
            'https://github.com/albertlouzon',
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    checkGameStatus() {

        if (isGameStarted === true) {
            alert('pf')
            this.setState({
                gameTitle: 'NTM'
            })
        }
    }

    render() {
        return (
            <Grid style={{height:'100vh',width:'100vw'}}>


<Hidden smDown>
            <Game>
                <Background />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 15, flexFlow: 'column no-wrap' }}>
                    <h3> Albert Louzon's interactive CV (ReactJS) </h3>


                    <Button variant="contained" color="secondary" onClick={this.onOpening} >
                        GitHub profile
                <GitHubIcon style={{ marginLeft: '2vh' }} />
                    </Button>


                </div>
                <div style={{ display: 'flex', flexFlow: 'row no-wrap', justifyContent: 'space-around', marginTop: '6vh' }}>
                    <Island title='Latest Experience' status={0} color='#273377' />
                    <Island title='Curiculum' status={1} color='#3949ab' />
                    <Island title={this.state.gameTitle} status={2} color='#606dbb' />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', flexFlow: 'row no-wrap' }}>
                    <Tutorial />
                </div>

                <MainShip />
                <BasicShip id={0} x={600} y={500} hp={30} />
                        <BasicShip id={1} x={50} y={550} hp={50} />
                    </Game>

                </Hidden>

                <Hidden mdUp>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"  >
                        <MobileDisplay />
                    </Grid>
                   
                </Hidden>
            </Grid>


           
        )
    }
}

