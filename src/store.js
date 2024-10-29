import { createStore, applyMiddleware } from "redux";
import  {thunk}  from "redux-thunk";
import rootReducer from './redux/reducers'
import { composeWithDevTools} from 'redux-devtools-extension';

const initialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare))); /*Funcion que crea store */

export default store;

/*Este archivo crea el almacenamiento y es exportado a app.js */