import axios from 'axios'
import { FETCH_ME, UPDATE_ME, CLEAR_MSG } from './types'

export function me() {
  return function (dispatch) {
    axios.get('/me')
      .then(response => {
        dispatch({
          type: FETCH_ME,
          payload: response.data
        })
      })
  }
}

export function update(user) {
	return function(dispatch) {
		axios.post('/update', {user})
		.then(response => {
			dispatch({
				type: UPDATE_ME,
        payload: user
			})
		})
	}
}

export function clearMsg() {
  return {
    type: CLEAR_MSG
  }
}