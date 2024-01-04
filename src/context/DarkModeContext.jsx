/* eslint-disable react/prop-types */
// eslint-disable-next-line react-refresh/only-export-components

import { createContext, useContext, useEffect } from "react";
import {useLocalStorageState} from '../hooks/useLocalStorageState'

const DarkModeContext=createContext()

 function DarkModeProvider({children}){

  const [isDarkMode, setIsDarkMode]=useLocalStorageState(false,'isDarkMode');

  useEffect(()=>{
   if(isDarkMode){
    document.documentElement.classList.add('dark-mode')
    document.documentElement.classList.remove('light-mode')

   }else{
    document.documentElement.classList.add('light-mode')
    document.documentElement.classList.remove('dark-mode')
   }
  },[isDarkMode])
  function toggleDarkMode(){
    setIsDarkMode((isDark)=>!isDark)
  }
 
  
  return <DarkModeContext.Provider value={{isDarkMode,toggleDarkMode}}>
    {children}
  </DarkModeContext.Provider>
}

function useDarkMode(){
  const context=useContext(DarkModeContext);
  if(context===undefined) throw new Error('dark mode context was used outside of dark mode provider')
  return context;
}

export {DarkModeProvider,useDarkMode}