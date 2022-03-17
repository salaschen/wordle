import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { useSelector, useDispatch } from 'react-redux'
import { distributeGuessesToRows } from '../lib/helper'
import axios from 'axios'

const generateQueryData = (guesses, info) => {
    // console.log('guesses: ', guesses) // debug
    // console.log('info: ', info) // debug
    const guessList = distributeGuessesToRows(guesses)
    
    const result = []
    for (let i = 0 ; i < guessList.length ; i++) {
        let gl = guessList[i]
        // If the list is not filled, do not include in the final result.
        if (gl.join('').length < gl.length) {
            break
        }
        else {
            let temp = [gl.join(''),info[i].join('')]
            // console.log('temp: ', JSON.stringify(temp)) // debug
            result.push(temp)
        }
    }
    return result
}

const ButtonGroup = (props) => {
    const guesses = useSelector(state => state.guesses)
    const info =  useSelector(state => state.info)
    const dispatch = useDispatch()

    const style = {
        justifyContent: "space-between"
    }

    const analyzeHandler = async (event) => {
        const queryData = generateQueryData(guesses, info)
        const query = {
            data: queryData
        }
        const url = 'https://wordle-helper-backend.herokuapp.com/guess'
        // const url = 'http://localhost:5000/guess'
        axios.defaults.headers.post['Content-Type'] = 'application/json'
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
        axios.post(url, query)
        .then(response => {
            // console.log(response.data) ; // debug
            dispatch({
                type: "UPDATE_CANDIDATE",
                data: response.data,
            })

        }).catch(error => {
            console.log('error:', error) ; 
        })
    }

    const resetHandler = (event) => {
        event.preventDefault()
        // use redux dispatch to resset the states
        dispatch({ type: 'RESET_CANDIDATE' })
        dispatch({ type: 'RESET_INFO' })
        dispatch({ type: 'RESET_GUESS' })
    }



    return (
        <Grid container style={style}>
            <Grid item xs={6} sm={6}>
                <Button variant="outlined" onClick={analyzeHandler} > Analyze </Button>
            </Grid>
            <Grid item xs={6} sm={6}>
                <Button variant="outlined" onClick={resetHandler} > Reset </Button>
            </Grid>
        </Grid>
    )
}

export default ButtonGroup
