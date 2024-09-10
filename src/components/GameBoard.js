/**
Gameboard - A 2-dimentional plane that holds the tiles of the game.
*/

import { useState, useEffect } from 'react'
import InputRow from './InputRow'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { useEventHandler } from '../lib/helper'
import { resetGame, keypressHandler, handleSubmit } from '../lib/helper2'
import { setWin, setNotification } from '../lib/reducerHelper'
import Snackbar from '@mui/material/Snackbar'
import Button from '@mui/material/Button'

const BoardStyle = {
    margin: "10px",
    padding: "10px",
    rowSpacing: {
        xs: 1,
        sm: 5
    },
    columnSpacing: {
        xs: 1, 
        sm: 2
    },
}

const GameBoard = (props) => {
    const values = useSelector(state => state.guesses)
    const tryNum = useSelector(state => state.tryNumber)
    const dispatch = useDispatch()
    const target = useSelector(state => state.word)
    const notification = useSelector(state => state.notification)
    const count = useSelector(state => state.count)
    // const letterMap = useSelector(state => state.letterMap)
    const [ open, setOpen] = useState(false)
    const [ showButton, setShowButton ] = useState('none')
    // console.log('win: ', win) // debug
    // console.log('in gameboard:'); // debug
    // console.log('notification: ', notification) // debug
    // console.log('target: ', target) // debug
    // console.log('tryNum: ', tryNum); // debug
    // console.log('letterMap:', letterMap); // debug
      
    // Get a new Target word
    // To be controled by a global state.
    useEffect(() => {
        // TODO: make a request to the backend to fetch a new word.
        const words = [
            'MOVIE', 'SAUCE', 'PITCH', 'STYLE', 'LOVER', 'HELLO', 'HAVEN', 'GUILT','SAINT', 
            'HANDY', 'JULIE', 'ENTER', 'WORLD'
        ]
        const chance = 1 / words.length
        let sent = false
        for (let i = 0 ; i < words.length ; i++) {
            if (Math.random() <= chance) {
                dispatch({
                    type: 'INIT_WORD', 
                    data: words[i], 
                })
                sent = true
                break
            }
        }
        if (!sent) {
            dispatch({
                type: 'INIT_WORD', 
                data: 'BLOOD', 
           })
        }
        setShowButton('none')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])

    const keypressEventHandler = async (event) => {
        // console.log('inside handler: ', event) ; // debug
        // Handle the 'Enter' key
        if (event.key === 'Enter' || event.keyCode === 13) {
            const guess = values[tryNum]
            const feedback = handleSubmit(event, dispatch, guess, target)

            // If the guess is not in the right format
            if (!feedback) {
                setNotification(dispatch, "Not a 5 letter word", setOpen)
                return
            }

            const idStart = tryNum * 5
            await flipRow(idStart, feedback)

            // User has win the game
            if (feedback.join('') === 'ggggg') {
                setWin(dispatch, true)
                setNotification(dispatch, "Excellent", setOpen)
                // resetGame(dispatch)
                setTimeout(() => {
                    setShowButton('')
                }, 1000)
            }
            // used up all the guesses, user loses.
            else if (tryNum === 5) {
                setNotification(dispatch, "You have used all guesses", setOpen)
                // resetGame(dispatch)
                setTimeout(() => {
                    setShowButton('')
                }, 1000)
            }
        }

        // Handle other keys
        else {
            return keypressHandler(event, dispatch, tryNum)       
        }
    }

    // register the key press handler, to monitor user keyboard input.
    useEventHandler('keydown', keypressEventHandler)
    
    return (
        <Grid container rowSpacing={2} sx={BoardStyle}>
            <Snackbar 
                key="notification" 
                open={open}
                anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}
                message={notification}
            />
 
            <Grid container sx={{justifyContent: "center", display: showButton}}>
                <Grid item>
                    <Button onClick={event => resetGame(dispatch)}
                    variant="contained"> Play Again </Button>
                </Grid>
            </Grid>
            <InputRow values={values[0]} idStart={0} />
            <InputRow values={values[1]} idStart={5} />
            <InputRow values={values[2]} idStart={10} />
            <InputRow values={values[3]} idStart={15} />
            <InputRow values={values[4]} idStart={20} />
            <InputRow values={values[5]} idStart={25} />
            {/* <button onClick={testFlip}> Flip </button> */}
        </Grid>
    )
}

// Flip the whole Row of characters.
const flipRow = async (idStart, feedback='ggggg') => {
    let threads = []
    for (let i = 0; i < 5 ; i++) {
       const id = i + idStart
        const elem = document.getElementById(id+'back')
        switch (feedback[i]) {
            case '.':
                elem.classList.add('Gray-Box')
                break 
            case 'g':
                elem.classList.add('Green-Box')
                break 
            case 'y':
                elem.classList.add('Yellow-Box')
                break 
            default:
                break 
        }

        let thisPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
                const elemContainer = document.getElementById(id)
                elemContainer.classList.add('flipped')
            }, i*500)
        })
        threads.push(thisPromise)
    }
    await Promise.all(threads)
}

export default GameBoard
