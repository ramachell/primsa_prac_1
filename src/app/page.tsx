'use client'
import { Button } from '@mui/joy'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return(
    <div>
      <p>홈</p>
      <Button 
        onClick={() => router.push('/login')}
      >
        로그인
      </Button>
    </div>
  )
}