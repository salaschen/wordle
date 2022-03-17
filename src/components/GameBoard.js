/**
Gameboard - A 2-dimentional plane that holds the tiles of the game.
*/

import { useState, useEffect, useRef } from 'react'
import InputRow from './InputRow'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useSelector, useDispatch } from 'react-redux'
import { distributeGuessesToRows, useEventHandler } from '../lib/helper'
import Keyboard from './Keyboard'
import { keypressHandler, handleSubmit } from '../lib/helper2'

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
      
    // Get a new Target word
    // To be controled by a global state.
    useEffect(() => {
        // TODO: make a request to the backend to fetch a new word.
        dispatch({
            type: 'INIT_WORD', 
            data: 'MOVIE', 
        })
    }, [])

    const keypressEventHandler = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            const guess = values[tryNum]
            const feedback = handleSubmit(event, dispatch, guess, target)
            if (!feedback) return
            const idStart = tryNum * 5
            flipRow(idStart, feedback)
        }
        else {
            return keypressHandler(event, dispatch, tryNum)       
        }
    }

    // register the key press handler, to monitor user keyboard input.
    useEventHandler('keydown', keypressEventHandler)
    
    return (
        <Grid container rowSpacing={2} sx={BoardStyle}>
            <InputRow values={values[0]} idStart={0} />
            <InputRow values={values[1]} idStart={5} />
            <InputRow values={values[2]} idStart={10} />
            <InputRow values={values[3]} idStart={15} />
            <InputRow values={values[4]} idStart={20} />
            <InputRow values={values[5]} idStart={25} />
            <button onClick={testFlip}> Flip </button>
        </Grid>
    )
}

const testFlip = (event) => {
    event.preventDefault()
    // const elem = document.getElementById('0')
    // console.log(elem) ; // debug
    flipRow(0) // flip the first row
}

// Flip the whole Row of characters.
const flipRow = (idStart, feedback='ggggg') => {
    // console.log('flip row:', idStart, feedback) // debug
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
        setTimeout(() => {
            const elemContainer = document.getElementById(id)
            elemContainer.classList.add('flipped')
        }, i*500)
    }
}


export default GameBoard
