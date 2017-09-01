import axios from 'axios'
import { UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
import { me } from './user'

export function signinUser({email, password}) {

  return function (dispatch) {

    // submit email and password to server
    const request = axios.post(`/signin`, {email, password})
    request
      .then(response => {
        // -Save the JWT token
        localStorage.setItem('auth-token', response.data.token)

        // -if request is good, we need to update state to indicate user is authenticated
        dispatch({type: AUTH_USER, payload: response.data})
        dispatch(me())
      })

      // If request is bad...
      // -Show an error to the user
      .catch(() => {
        dispatch(authError('bad login info'))
      })

  }
}

export function signoutUser() {
  localStorage.removeItem('auth-token')
  return function(dispatch) {
    dispatch(
      {type: UNAUTH_USER}
    )
    dispatch({
      type: 'APOLLO_STORE_RESET',
      observableQueryIds: []
    })
  }
}

export function signupUser({email, password, passwordConfirmation}) {
  return function (dispatch) {
    axios.post(`/signup`, {email, password, passwordConfirmation})
      .then(response => {
        console.log(response)
        dispatch({type: AUTH_USER, payload: response.data})
        dispatch(me())
        localStorage.setItem('auth-token', response.data.token)
      })
      .catch(({response}) => {
        dispatch(authError(response.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get('/getMessage')
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      })
  }
}