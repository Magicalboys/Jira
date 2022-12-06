import React, { useState } from "react";


interface Authfrom {
  username:string;
  password:string;
}

const AuthContext = React.createContext(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ()=>{

  const [user,setUser] = useState(null);


}









