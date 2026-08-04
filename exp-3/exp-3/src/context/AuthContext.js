import React,{createContext,useState,useContext,useEffect} from 'react';

const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const token=localStorage.getItem('token');
    if(token){
      try{
        const userData=JSON.parse(atob(token.split('.')[1]));
        setUser(userData);
      }catch(e){
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  },[]);

  const login=(username,password)=>{
    if(username==='admin'&&password==='password'){
      const payload={id:1,username:'admin',role:'admin'};
      const header=btoa(JSON.stringify({alg:'HS256',typ:'JWT'}));
      const payloadEncoded=btoa(JSON.stringify(payload));
      const token=`${header}.${payloadEncoded}.mock_signature`;
      localStorage.setItem('token',token);
      setUser(payload);
      return true;
    }
    return false;
  };

  const logout=()=>{
    localStorage.removeItem('token');
    setUser(null);
  };

  return(
    <AuthContext.Provider value={{user,login,logout,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>useContext(AuthContext);