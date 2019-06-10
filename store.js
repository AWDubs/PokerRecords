import React from 'react';
import { createStore } from 'redux';

const reducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_SESSION":
            state = {
                ...state,

            }
            break;
        case "ADD_HAND":
            state = {
                ...state,

            }
            break;
    }
    return state;
};

const store = createStore(reducer, 0);

store.dispatch({
    type: "ADD_SESSION",
    payload: 0
});

export default store;