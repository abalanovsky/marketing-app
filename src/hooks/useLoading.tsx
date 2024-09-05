import { useState } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

export function useLoading() {
  const [loading, setLoading] = useState(false)

  const LoadingComponent = (
    <Backdrop open={loading} style={{ color: '#fff', zIndex: 1301 }}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )

  return { loading, setLoading, LoadingComponent }
}
