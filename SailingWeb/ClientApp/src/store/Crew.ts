import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import axios from 'axios';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CrewState {
    isLoading: boolean;
    crew: CrewMember[]
}

export interface CrewMember {
    id: number;
    name: string;
    email: string;
    role: string;
    age: number;
    certifiedUntil: Date;
    picture?: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestCrewAction {
    type: 'REQUEST_CREW';
}

interface ReceiveCrewAction {
    type: 'RECEIVE_CREW';
    crew: CrewMember[];
}

interface PostCrewAction {
    type: 'POST_CREW';
    crewMember: CrewMember;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestCrewAction | ReceiveCrewAction | PostCrewAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCrew: (id: number): AppThunkAction<KnownAction> => (dispatch) => {
        axios.get("/api/CrewMembers/" + id)
            .then(({ data }) => {
                dispatch({ type: 'RECEIVE_CREW', crew: data });
            });
    },
    postCrew: (crewMember: CrewMember): AppThunkAction<KnownAction> => (dispatch) => {
        axios.post("/api/CrewMembers", crewMember)
            .then(({ data }) => {
                dispatch({ type: 'POST_CREW', crewMember: data });
            });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CrewState = { crew: [], isLoading: false };

export const reducer: Reducer<CrewState> = (state: CrewState | undefined, incomingAction: Action): CrewState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_CREW':
            return {
                crew: state.crew,
                isLoading: true,
            };
        case 'RECEIVE_CREW':
            return {
                crew: action.crew,
                isLoading: false,
            };
        case 'POST_CREW':
            return {
                crew: state.crew.concat(action.crewMember),
                isLoading: false,
            };
    }

    return state;
};
