/**
The main component for the Game. Including the gameboard, input boxes, keyboards, etc.
*/
import Header from './Header'
import Container from '@mui/material/Container'
import GameBoard from './GameBoard'
import Divider from '@mui/material/Divider'
import Keyboard from './Keyboard'
import Grid from '@mui/material/Grid'

function Main() {


  return (
    <div className="Main">
        <Header />
        <Divider />
        <Container maxWidth="sm">
            <GameBoard />
        </Container>
        <Container maxWidth="sm">
            <Keyboard />
        </Container>
    </div>
  );
}

export default Main;

