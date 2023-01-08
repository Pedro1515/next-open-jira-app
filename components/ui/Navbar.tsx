import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { useContext } from "react";

import MenuIcon from '@mui/icons-material/Menu';

import { UIContext } from '../../context/ui';

interface Props {}

export const Navbar = ({}: Props) => {
    const { openSideMenu } = useContext(UIContext)

    return (
        <AppBar position="sticky">
            <Toolbar>
                <IconButton
                    edge="start"
                    onClick={openSideMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    Open Jira
                </Typography>
            </Toolbar>
        </AppBar>
    )
}