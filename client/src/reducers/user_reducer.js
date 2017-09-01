import { FETCH_ME, UPDATE_ME, CLEAR_MSG } from '../actions/types'

export default function userReducer(state = {user: null, loading: true, successMsg: null}, action) {
  switch (action.type) {
    case FETCH_ME:
      return Object.assign({}, {user: action.payload, loading: false})
    case UPDATE_ME:
      return Object.assign({}, {user: {...state.user, ...action.payload}, successMsg: '修改成功！'})
    case CLEAR_MSG:
      return {...state, successMsg: null}
    default:
      return state
  }
}

