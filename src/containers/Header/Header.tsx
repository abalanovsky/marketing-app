import Box from '@mui/material/Box'
import { Badge } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AirlinesIcon from '@mui/icons-material/Airlines'
import { styles } from './Header.styles.ts'

function Header() {
  return (
    <Box sx={styles.headerContainer}>
      <Typography variant='h6' sx={styles.headerLogo}>
        <AirlinesIcon sx={styles.logoIcon} />
        MarketingApp
      </Typography>
      <Box sx={styles.buttons}>
        <Badge badgeContent={4} color='primary'>
          <NotificationsIcon color='action' />
        </Badge>
        <IconButton sx={styles.avatar}>
          <Avatar alt='User Avatar' />
        </IconButton>
      </Box>
    </Box>
  )
}
export default Header
