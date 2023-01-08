import { EntriesStateProps } from './EntriesProvider';

type EntriesActionTypes = 
    |{type: '[Entries] - Add Entry';}
    |{type: '[Entries] - Delete Entry';}

export const entriesReducer = ( state: EntriesStateProps, action: EntriesActionTypes ): EntriesStateProps => {

    switch (action.type) {
        case '[Entries] - Add Entry':
            return {
                ...state,
            }

        case '[Entries] - Delete Entry':
            return {
                ...state,
            }

        
        default:
            return state;
    }
}