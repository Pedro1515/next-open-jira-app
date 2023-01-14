import { FC, PropsWithChildren, useEffect, useReducer } from "react"

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

    const createEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>(
            "/entries",
            { description }
        );

        dispatch({
            type: '[Entries] - Add-Entry',
            payload: data
        })
    }

    const deleteEntry = (entry: Entry) => {
        dispatch({
            type: '[Entries] - Delete-Entry',
            payload: entry
        })
    }

    const updateEntry = async (entry: Entry) => {
        const { data } = await entriesApi.patch<Entry>(
            `/entries/${entry._id}`,
            { ...entry }
        );

        dispatch({
            type: '[Entries] - Update-Entry',
            payload: data
        })

        return data;
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