import { useContext } from 'react';

import { Box, ClickAwayListener, Drawer, List, Typography } from '@mui/material';
import { UIContext } from '../../context/ui/UIContext';

interface Props {}

const menuItems = [
    "Inbox",
    "Starred",
    "Send Email",
    "Drafts",
]

export const Sidebar = ({}: Props) => {
    const { sideMenuOpen, closeSideMenu } = useContext(UIContext)

    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={closeSideMenu}
        >
            <Box sx={{ padding: '5px 10px' }}>
                <Typography variant='h6'>
                    Menu
                </Typography>
            </Box>
            <List>

            </List>
        </Drawer>
    )
}