import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface EntriesContextProps {
    entries: Entry[];
    createEntry: (description: string) => void;
    deleteEntry: (entry: Entry) => void;
    updateEntry: (entry: Entry) => Promise<Entry>
}

export const EntriesContext = createContext<EntriesContextProps>({} as EntriesContextProps)