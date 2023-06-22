import React from 'react'
import './globals.css'

import Head from 'next/head'

const layout = ({children}) => {
  return (
    <html lang="en">
   
      <body className ='root'>
        {children}
      </body>
    </html>
  )
}

export default layout