import React, { useCallback, ReactNode } from 'react'
import { View, Image, Text } from 'react-native'
import { styles } from './styles'
import { BorderlessButton } from 'react-native-gesture-handler'
import Back from '../../assets/images/icons/back.png'
import Logo from '../../assets/images/logo.png'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps{
  title: string
  icon?: ReactNode
}

export const Header:React.FC<HeaderProps> = ({ title, icon, children }) => {
  const { navigate } = useNavigation()
  const handleGoBack = useCallback(() => {
    navigate('Landing')
  }, [navigate])
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={Back} resizeMode="contain"/>
        </BorderlessButton>
        <Image source={Logo} resizeMode="contain"/>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon}
      </View>
      {children}
    </View>
  )
}
