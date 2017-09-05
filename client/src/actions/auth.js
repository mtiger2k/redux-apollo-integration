import axios from 'axios'
import { CLEAR_USER, UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types'
import { me } from './user'

export function signinUser({username, password}) {

  return function (dispatch) {

    // submit username and password to server
    const request = axios.post(`/signin`, {username, password})
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
      .catch((error) => {
        console.log(error)
        dispatch(authError('bad login info'))
      })

  }
}

export function signoutUser() {
  localStorage.removeItem('auth-token')
  return function(dispatch) {
    /*dispatch(
      {type: UNAUTH_USER}
    )
    dispatch(
      {type: CLEAR_USER}
    )
    dispatch({
      type: 'APOLLO_STORE_RESET',
      observableQueryIds: []
    })*/
    dispatch(
      {type: 'USER_LOGOUT'}
    )
  }
}

export function signupUser({username, password, dispName, mobileNo}) {
  return function (dispatch) {
    axios.post(`/signup`, {username, password, dispName, mobileNo})
      .then(response => {
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