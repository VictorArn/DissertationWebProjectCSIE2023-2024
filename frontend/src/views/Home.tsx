import { Box } from "@mui/material";
import icon from '../icon.png'

export default function Home(){
    return(
        <Box display="flex" flexDirection="column" alignItems="center">
        <div>
          <h1 style={{ color: "#6610f2" }}>Welcome to Dissertation App!</h1>
        </div>
        <div>
          <img src={icon} alt="Icon" style={{ width: '900px', height: '900px' }} />
        </div>
      </Box>
    )    
}