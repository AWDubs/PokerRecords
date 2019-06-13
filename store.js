import React from 'react';
import { createStore } from 'redux';


const initialState = {
    NextId: 0,
    SessionList: [],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_SESSION": //pass a session as action.payload
            state = {
                ...state,
                NextId: state.NextId + 1,
                SessionList: [...state.SessionList, action.payload]
            };
            break;
        case "DELETE_SESSION": //pass a session as action.payload
            state = {
                ...state,
                SessionList: state.SessionList.filter((session) => session.Id !== action.payload.Id)
            };
            break;
        case "UPDATE_SESSION": //pass session as action.payload
            state = {
                ...state,
                SessionList: state.SessionList.map((session) => {
                if (session.Id === action.payload.Id) {
                    return action.payload;
                }

                return session;
                })
            };
            break;
    }
    return state;
};

const store = createStore(reducer);

export default store;