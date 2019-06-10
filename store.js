import React from 'react';
import { createStore } from 'redux';
import { SessionObject } from './screens/Session';

//var newSession1 = new SessionObject("Default", []);

const initialState = {
     currentSession: undefined,
     SessionList: [],
    //Count: 0,
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SESSION":
            state = {
                ...state,
                currentSession: action.payload,
                SessionList: [...state.SessionList, action.payload]
            };
            break;
        case "ADD_HAND":
            state = {
                ...state,
                
            };
            break;
        case "ADD_COUNT":
            break;
    }
    return state;
};

const store = createStore(reducer);

export default store;