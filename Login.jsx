import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
function Login() {
  const { loginWithRedirect,logout } = useAuth0()
  return (
    <div>
      <button onClick={() => loginWithRedirect()}>Log In/Sign Up</button>
    </div>
  )
}


export default Login