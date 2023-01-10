import { FC, PropsWithChildren, useReducer } from "react"

import { v4 as uuidv4 } from 'uuid'

import { EntriesContext } from './EntriesContext';
import { Entry } from '../../interfaces/entry';
import { entriesReducer } from './entriesReducer';

export interface EntriesStateProps {
    entries: Entry[];
}

const INITIAL_STATE: EntriesStateProps = {
    entries: [
        {
            _id: uuidv4(),
            createdAt: Date.now(),
            description: 'Pendiente: Id voluptate consectetur occaecat excepteur nisi cupidatat sint exercitation nisi.',
            status: 'PEDING',
        },
        {
            _id: uuidv4(),
            createdAt: Date.now() - 1543234,
            description: 'En-progreso: Consectetur consectetur labore minim magna minim consectetur sit do est occaecat.',
            status: 'IN_PROGRESS',
        },
        {
            _id: uuidv4(),
            createdAt: Date.now() - 862565,
            description: 'Terminadas Ullamco dolore est minim commodo laboris ullamco Lorem.',
            status: 'FINISHED',
        }
    ],
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, INITIAL_STATE as any)

    const createEntry = (description: string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            createdAt: Date.now(),
            description,
            status: 'PEDING',
        }
        
        dispatch({
            type: '[Entries] - Add-Entry',
            payload: newEntry
        })
    }

    const deleteEntry = (entry: Entry) => {
        dispatch({
            type: '[Entries] - Delete-Entry',
            payload: entry
        })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({
            type: '[Entries] - Update-Entry',
            payload: entry
        })
    }

    return (
        <EntriesContext.Provider value={{ 
            ...state,
            createEntry,
            deleteEntry, 
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}