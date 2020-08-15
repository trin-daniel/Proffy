import React from 'react'
import
{
  Archivo_400Regular,
  Archivo_700Bold,
  useFonts
} from '@expo-google-fonts/archivo'
import
{
  Poppins_400Regular,
  Poppins_600SemiBold
} from '@expo-google-fonts/poppins'

import { StatusBar } from 'expo-status-bar'
import { AppLoading } from 'expo'
import { AppStack } from './src/navigation/app-stack'

export default function App () {
  const [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold

  })

  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <>
        <AppStack/>
        <StatusBar style="light" />
      </>
    )
  }
}
