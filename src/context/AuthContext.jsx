import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api, { bootstrapAuth, getCurrentUser, setAuthToken } from '../api/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bootstrapAuth()
    ;(async () => {
      try {
        const me = await getCurrentUser()
        setUser(me)
      } catch (_) {
        // not logged in
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const login = async (values) => {
    const data = await api.login(values)
    try {
      const me = await getCurrentUser()
      setUser(me)
    } catch (_) {}
    return data
  }

  const authenticateWithToken = async (token) => {
    setAuthToken(token)
    try {
      const me = await getCurrentUser()
      setUser(me)
    } catch (_) {}
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, logout, authenticateWithToken }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


