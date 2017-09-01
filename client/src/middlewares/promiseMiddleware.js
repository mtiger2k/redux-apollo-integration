import axios from 'axios';

function createThunkMiddleware(extraArgument) {
    return ({dispatch, getState}) => next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState, extraArgument);
        }
        const {promise, types, afterSuccess, ...rest} = action;
        if (!action.promise) {
            return next(action);
        }

        const defaultSuccess = (dispatch, getState, result) => result;
        const onSuccess = afterSuccess || defaultSuccess;
        const [REQUEST, SUCCESS, FAILURE] = types;
        next({...rest, type: REQUEST});

        const onFulfilled = result => {
            next({...rest, result, type: SUCCESS});
            return result;
        };
        const onRejected = (error) => {
            next({...rest, error, type: FAILURE});

            // handle error status, set error message
            if (error.status === 422 || error.status === 400) {
                const newAction = {
                    type: 'SET_MESSAGE',
                    payload: error.data.error || "undefined error"
                }
                dispatch(newAction);
            }

            if (error.status === 401 || error.status === 500) {
            }

            return error;
        };
        return promise(axios, extraArgument)
            .then(onFulfilled, onRejected)
            .then(result => onSuccess(dispatch, getState, result))
            .catch(error => console.error('MIDDLEWARE ERROR:', error));
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;