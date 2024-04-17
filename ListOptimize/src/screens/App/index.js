import { View, Text } from 'react-native'
import React from 'react'
import Home from '../Home'
import DimentionsContextProvider from '../../context'

const App = () => {
  return (
    <DimentionsContextProvider>
        <Home />
    </DimentionsContextProvider>
  )
}

export default App