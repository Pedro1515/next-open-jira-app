import { FC, PropsWithChildren, useEffect, useReducer } from "react"

import { v4 as uuidv4 } from 'uuid'

import { EntriesContext } from './EntriesContext';
import { Entry } from '../../interfaces/entry';
import { entriesReducer } from './entriesReducer';
import entriesApi from '../../apis/entriesApi';

export interface EntriesStateProps {
    entries: Entry[];
}

const INITIAL_STATE: EntriesStateProps = {
    entries: [],
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

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({
            type: '[Entries] - Set-Entries',
            payload: data
        })
    }

    useEffect(() => {
        refreshEntries()
    }, [])
    

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