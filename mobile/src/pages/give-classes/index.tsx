import React from 'react'
import
{
  View,
  Text,
  ImageBackground
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles'
import icon from '../../assets/images/give-classes-background.png'

export const GiveClasses = () => {
  const { goBack } = useNavigation()
  const handleNavigateGoBack = () => goBack()
  return (
    <View style={styles.container}>
      <ImageBackground
        source={icon}
        style={styles.content}
        resizeMode="contain"
      >
        <Text
          style={styles.title}
        >
          Voçê quer ser um Proffy?
        </Text>

        <Text
          style={styles.description}
        >
          Para começar, voçê precisa se cadastrar como um professor na nossa plataforma web.
        </Text>
      </ImageBackground>
      <RectButton
        style={styles.button}
        onPress={handleNavigateGoBack}
      >
        <Text
          style={styles.buttonText}
        >
          Entendi
        </Text>
      </RectButton>
    </View>
  )
}
