import { useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import SignUpPage from './pages/auth/signup/SignUpPage'
import LoginPage from './pages/auth/login/LoginPage'
import Sidebar from './components/common/Sidebar'
import RightPanel from './components/common/RightPanel'
import NotificationPage from './pages/notification/NotificationPage'
import ProfilePage from './pages/profile/ProfilePage'
import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './components/common/LoadingSpinner'

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const { data:authUser, isLoading, error, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if(data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        // Handle error appropriately
        throw error;
      }
    },
    retry:false
  });
  if(isLoading){
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size='lg'/>
      </div>
    )
  }

  return (
    <div className={`${isAuthPage ? '' : 'flex max-w-6xl mx-auto'}`}>
      {/* Only show Sidebar if not on login or signup pages */}
      {!isAuthPage && <Sidebar />}
      
      <main className={`${isAuthPage ? 'w-full' : 'flex-1'}`}>
        <Routes>
          <Route path='/' element={authUser?<HomePage />:<Navigate to="/login" />} />
          <Route path='/signup' element={!authUser?<SignUpPage />:<Navigate to="/"/>} />
          <Route path='/login' element={!authUser?<LoginPage />:<Navigate to="/"/>} />
          <Route path='/notifications' element={authUser?<NotificationPage />:<Navigate to="/login"/>} />
          <Route path='/profile/:username' element={authUser?<ProfilePage />:<Navigate to="/login"/>} />
        </Routes>
      </main>
      
      {/* Only show RightPanel if not on login or signup pages */}
      {!isAuthPage && <RightPanel />}
      
      <Toaster />
    </div>
  )
}

export default App