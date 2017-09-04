import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import { createLogger } from 'redux-logger'
import reduxThunk from 'redux-thunk'
import promiseMiddleware from './middlewares/promiseMiddleware'
import reducers from './reducers'

export default (apolloClient, initialState, history) => {
	// Build the middleware for intercepting and dispatching navigation actions
	const middleware = routerMiddleware(history)

	const middlewares = process.env.NODE_ENV === 'development' ?
	    [applyMiddleware(middleware, promiseMiddleware, reduxThunk, createLogger())] :
	    [applyMiddleware(middleware, promiseMiddleware, reduxThunk)];

	const appReducer = combineReducers({
        ...reducers,
        router: routerReducer,
        apollo: apolloClient.reducer(),
        form: formReducer
    })

    const rootReducer = (state, action) => {
    	if (action.type == 'USER_LOGOUT') {
    		state = undefined
    	}
    	return appReducer(state, action)
    }

	const store = createStore(
	    rootReducer,
	    initialState,
	    compose(
	    	applyMiddleware(apolloClient.middleware()), ...middlewares,
	    	// If you are using the devToolsExtension, you can add it here also
			window.devToolsExtension ? window.devToolsExtension() : f => f,
	    )
	)

	return store
}