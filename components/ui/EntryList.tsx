import { List, Paper } from "@mui/material"
import { EntryCard } from "./EntryCard"

interface Props {}

export const EntryList = ({}: Props) => {
    return (
        <div>
            <Paper 
                // elevation={0} 
                sx={{ 
                    height: 'calc(100vh - 180px)', 
                    overflow: 'auto', 
                    backgroundColor: 'transparent', 
                    padding: '5px 10px',
                }}
            >

                <List sx={{ opacity: 1 }}>
                    <EntryCard />
                </List>

            </Paper>
        </div>
    )
}
