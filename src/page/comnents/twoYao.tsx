import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material";
import Stack from "@mui/material/Stack";


const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },

    },
});
export function Ying(){
    return (
        <ThemeProvider theme={theme}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
                <Button variant="contained"  sx={{width:'30px',height:"40px",borderRadius:0}}></Button>
                <Button variant="contained"  sx={{width:'30px',height:"40px",borderRadius:0}}></Button>
            </Stack>
        </ThemeProvider>
    )
}

export function Yang() {
    return (
    <ThemeProvider theme={theme}>
        <Button variant="contained" sx={{width:'200px',height:"40px",borderRadius:0}}></Button>
    </ThemeProvider>
    )
}