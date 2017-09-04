import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types'

export default function authReducer(state = {authenticated: false, token: null}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {...state, error: '', authenticated: true, token: action.payload.token}
    case UNAUTH_USER:
      return {...state, authenticated: false, token: null}
    case AUTH_ERROR:
      return {...state, error: action.payload}
    case FETCH_MESSAGE:
      return {...state, message: action.payload}
    default:
      return state
  }
}

