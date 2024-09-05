import { FC } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import { Chip, Divider } from '@mui/material'
import LayersIcon from '@mui/icons-material/Layers'
import FormAccordion from '../../containers/FormAccordion/FormAccordion.tsx'
import { styles } from './CardsDrawer.styles.ts'

interface CardDrawerProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CardsDrawer: FC<CardDrawerProps> = ({ open, setOpen }) => {
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={styles.drawerContainer} role='presentation'>
      <Divider>
        <Chip
          label='Create image layers'
          variant='outlined'
          color='success'
          icon={<LayersIcon />}
        />
      </Divider>
      <FormAccordion />
    </Box>
  )

  return (
    <div>
      <Drawer anchor={'right'} open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
