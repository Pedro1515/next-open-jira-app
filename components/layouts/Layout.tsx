import { Box } from "@mui/material"
import Head from "next/head"
import { PropsWithChildren } from "react";
import { Navbar, Sidebar } from "../ui";

interface Props extends PropsWithChildren<any> {
    title?: string
}

export const Layout = ({ title = 'Open Jira', children }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Head>
            <title>{ title }</title>
        </Head>
        <Navbar />
        <Sidebar />
        <Box sx={{ padding: '10px 20px' }}>
          { children }
        </Box>
    </Box>
  )
}
