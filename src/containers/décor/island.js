import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {StartGame} from '../../containers/ennemies/basic_ship'
import NavigationIcon from '@material-ui/icons/Navigation';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PDF from 'react-pdf-js';
import InternshipResume from '../../components/Modals/internshipResume';
let tamer = false

let x = null
export let isGameStarted = false
const styles = theme => ({
 
  extendedIcon: {
    marginRight: '2vh',
  },
  button: {
    marginTop:'15vh',
    marginLeft: '1vh',
  }
});

 class Island extends Component {

  constructor(props) {
    super(props)
    this.x = this.props.x
    this.y = this.props.y
    this.title = this.props.title
    this.color= this.props.color
    this.status=this.props.status
    this.state = {
       x:null,
       openCV:false,
       openLatestExp:false,
    }
  }

 

  handleClickOpenCV = () => {
    this.setState({ openCV: true });
  };

  handleCloseCV = () => {
    this.setState({ openCV: false });
  };

  handleClickOpenLE = () => {
    this.setState({ openLatestExp: true });
  };

  handleCloseLE = () => {
    this.setState({ openLatestExp: false });
  };

  onClicking(button){
    if(button==0){
      this.handleClickOpenLE()
    }else if(button==1){
    this.handleClickOpenCV()

    }else{
      if(isGameStarted===false){
        isGameStarted=true

      }
      else if(isGameStarted===true){
        isGameStarted=false

      }


    }
      }
  render() {
    if(tamer==true){
      console.log('bah suce ton pere')
    }
    else if(tamer==false){
      setTimeout(() => {
        this.handleClickOpenCV()
      }, 750);
      tamer = true
    }
  
    const { classes } = this.props;
    const { pageNumber, numPages } = this.state;

    let size = this.props.status==1 ? size= {
      height:'35vh',
      width:'35vh',
    } : {
      height:'20vh',
      width:'20vh'
    }


    return (
      <div style={{height:size.height, width:size.width,
       backgroundImage:'url("http://pngimage.net/wp-content/uploads/2018/06/island-cartoon-png-3.png")', backgroundSize:'contain',backgroundRepeat:'no-repeat',
       display:'flex',
       alignItems:'center'
       }}>
        
        <Button variant="contained" aria-label="Delete" color='primary' className={classes.button}  onClick={()=>{this.onClicking(this.props.status)}}>
        {this.props.title}
      </Button>
      
      <Dialog
          open={this.state.openCV}
          onClose={this.handleCloseCV}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
          <PDF
          file="cvAlbert2019.pdf"
      
        />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCV} color="primary">
              Go to interactive CV
            </Button>
           
          </DialogActions>
        </Dialog>



        
      <Dialog
          open={this.state.openLatestExp}
          onClose={this.handleCloseLE}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <InternshipResume/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseLE} color="primary">
              Close
            </Button>
           
          </DialogActions>
        </Dialog>
        </div>
    )
  }
}


export default withStyles(styles)(Island);
