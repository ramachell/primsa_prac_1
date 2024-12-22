'use client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Button } from '@mui/joy'

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // 현재 세션 체크
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    if (error) console.log('Error:', error.message)
    console.log(user)
      
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error:', error.message)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!user ? (
        <Button
          onClick={handleSignIn}
        >
          Google로 로그인
        </Button>
      ) : (
        <div className="text-center">
          <p className="mb-4">환영합니다, {user.email}!</p>
          <p>{user.user_metadata.full_name}</p>
          <Button onClick={() => console.log(user)} sx={{ margin: '10px' }}>테스트</Button>
          <Button
            onClick={handleSignOut}
          >
            로그아웃
          </Button>
        </div>
      )}
    </div>
  )
}