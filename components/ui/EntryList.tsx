import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"
import { EntryStatus } from '../../interfaces/entry';
import { useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';

interface Props {
    status: EntryStatus;
}

export const EntryList = ({ status }: Props) => {
    const { entries, updateEntry } = useContext(EntriesContext)
    const { isDraggingEntry, stopDraggingEntry } = useContext( UIContext )

    const entriesByStatus = useMemo(() => {
        return entries.filter( entry => entry.status === status );
    }, [entries])

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        const entry = entries.find( entry => entry._id === id )!;

        updateEntry({
            ...entry,
            status
        })
        
        stopDraggingEntry() 
    }

    const onAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    return (
        <div
            onDrop={onDrop}
            onDragOver={onAllowDrop}
            style={{ 
                flexGrow: 1,
                overflow: 'auto',
                borderRadius: '4px',
                backgroundColor: isDraggingEntry ? 'rgba(255, 255 ,255, 0.2)' : '', 
            }}
        >
            <Paper 
                sx={{ 
                    height: '100%',
                    overflow: 'auto', 
                    backgroundColor: 'transparent', 
                    padding: '0 10px',
                }}
            >

                <List sx={{ padding: 0 }}>
                    { entriesByStatus.map( entry => (
                        <EntryCard key={entry._id} entry={entry} />
                    )) }
                </List>

            </Paper>
        </div>
    )
}
