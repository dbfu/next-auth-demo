import { Suspense } from 'react'
import ActivateClient from './client'

export default function ActivatePage() {
  return (
    <Suspense>
      <ActivateClient />
    </Suspense>
  )
}

