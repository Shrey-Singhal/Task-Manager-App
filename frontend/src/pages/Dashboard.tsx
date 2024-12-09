import React from 'react'
import { useAuth } from '../contexts/authContext'

function Dashboard() {
  const { user } = useAuth();
  return (
    <div>{user?.name}</div>
  )
}

export default Dashboard