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
import { keypressHandler } from '../lib/helper2'

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
    // values are 5 list of strings, each is of size 5.
    // Original values are all ''.
    const original = ['','','','','']
    const originalList = []
    for (let i = 0 ; i <  5 ; i++) { originalList.push(original.concat()) }
    const [values, setValues] = useState(originalList)
    const dispatch = useDispatch()
      
    const keypressEventHandler = (event) => {
        return keypressHandler(event, dispatch)       
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
        </Grid>
    )
}

export default GameBoard
