import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#1363DF'      
    },
    secondary: {
      main: '#18874b'
    },
    error: {
      main: red.A400
    },
  },
  components: {
    MuiAppBar: {
      // styleOverrides: {
      //   root: {
      //      backgroundColor: '#191919'
      //   }
      // },
      
    }
  }
});
