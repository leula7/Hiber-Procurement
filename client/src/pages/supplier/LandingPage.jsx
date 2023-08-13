import React from 'react'
import { useSelector } from 'react-redux';

const LandingPage = () => {
    const id = useSelector((state) => state.auth.user.user_id);
        console.log(id);
        
  return (
    <div>
        welcome to Hiber procurement!
    </div>
  )
}

export default LandingPage