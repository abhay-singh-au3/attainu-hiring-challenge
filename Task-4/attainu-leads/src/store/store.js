import { createStore, combineReducers } from 'redux';
import studentReducer from './reducer/studentReducer';


let reducer = combineReducers({
    students: studentReducer
})

let store = createStore(reducer);

function stateMapper(state) {
    return state;
}

export { store, stateMapper };