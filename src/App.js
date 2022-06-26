import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'

export default function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container">
      {!session ? <Auth /> : <div>
        <pre>{session.user.id}</pre>
        <pre>{JSON.stringify(session)}</pre>
        <button onClick={() => {
          supabase.auth.signOut()
        }}>Logout</button>
      </div>}
    </div>
  )
}