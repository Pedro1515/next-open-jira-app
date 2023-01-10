import { Entry } from '../../interfaces';
import { EntriesStateProps } from './EntriesProvider';

type EntriesActionTypes = 
    |{ type: '[Entries] - Add-Entry'; payload: Entry; }
    |{ type: '[Entries] - Delete-Entry'; payload: Entry; }
    |{ type: '[Entries] - Update-Entry'; payload: Entry; }

export const entriesReducer = ( state: EntriesStateProps, action: EntriesActionTypes ): EntriesStateProps => {

    switch (action.type) {
        case '[Entries] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        case '[Entries] - Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter( entry => entry._id !== action.payload._id )
            }
        
        case '[Entries] - Update-Entry':
            return {
                ...state,
                entries: state.entries.map((entry) =>
                    entry._id === action.payload._id ? action.payload : entry
                ),
            };
        
        default:
            return state;
    }
}