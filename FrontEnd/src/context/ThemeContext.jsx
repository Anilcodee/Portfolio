import React, { createContext, useEffect, useState } from 'react'

export const ThemeContextData = createContext()
const ThemeContext = ({children}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark")
  useEffect(() => {
    const root = document.documentElement
    if(theme === "dark"){
        root.classList.add("dark")
    } else {
        root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  },[theme])
  const value = {theme, setTheme}
  return (
    <ThemeContextData.Provider value={value}>
        {children}
    </ThemeContextData.Provider>
  )
}

export default ThemeContext