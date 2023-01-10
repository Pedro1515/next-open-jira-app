import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';
import { Entry } from '../../interfaces';
import { useRelativeTime } from '../../utils/hooks/useRelativeTime';
import { UIContext } from '../../context/ui/UIContext';
import { useContext } from 'react';

interface Props {
    entry: Entry;
}

export const EntryCard = ({ entry }: Props) => {
    const { description, createdAt } = entry;
    const { startDraggingEntry } = useContext( UIContext )

    const relativeTime = useRelativeTime(createdAt)

    //drag and drop
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', `${entry._id}`);
        startDraggingEntry()
        //TODO: modificar el estado para indicar que se está arrastrando una entrada
    }

    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    }

    return (
        <Card
            sx={{ margin: '10px 0' }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography> 
                </CardContent>
                
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}> 
                    <Typography variant='body2'>hace {relativeTime?.count} {relativeTime?.unit}</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
