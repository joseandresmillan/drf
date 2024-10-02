import { createStore, applyMiddleware } from "redux";
import  {thunk}  from "redux-thunk";
import rootReducer from './redux/reducers'
import { composeWithDevTools} from 'redux-devtools-extension';

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;