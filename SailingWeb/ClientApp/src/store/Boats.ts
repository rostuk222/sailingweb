import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BoatsState {
    isLoading: boolean;
    boats: Boat[];
}

export interface Boat {
    id: number;
    name: string;
    producer: string;
    buildNumber: string;
    loa: number;
    b: number;
    picture: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestBoatsAction {
    type: 'REQUEST_BOATS';
}

interface ReceiveBoatsAction {
    type: 'RECEIVE_BOATS';
    boats: Boat[];
}

interface PostBoatAction {
    type: 'POST_BOAT';
    boat: Boat;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestBoatsAction | ReceiveBoatsAction | PostBoatAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestBoats: (): AppThunkAction<KnownAction> => (dispatch) => {
        axios.get("/api/Boats")
            .then(({ data }) => {
                dispatch({ type: 'RECEIVE_BOATS', boats: data });
            });
    },
    postBoat: (boat: Boat): AppThunkAction<KnownAction> => (dispatch) => {
        axios.post("/api/Boats", boat)
            .then(({ data }) => {
                dispatch({ type: 'POST_BOAT', boat: data});
            });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: BoatsState = { boats: [], isLoading: false };

export const reducer: Reducer<BoatsState> = (state: BoatsState | undefined, incomingAction: Action): BoatsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_BOATS':
            return {
                boats: state.boats,
                isLoading: true
            };
        case 'RECEIVE_BOATS':
            return {
                boats: action.boats,
                isLoading: false
            };
        case 'POST_BOAT':
            return {
                boats: state.boats.concat(action.boat),
                isLoading: false
            };
    }

    return state;
};
