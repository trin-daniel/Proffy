import React, { useCallback, useEffect, useState } from 'react'
import
{
  View,
  Image,
  Text
} from 'react-native'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import landingIcon from '../../assets/images/landing.png'
import studyIcon from '../../assets/images/icons/study.png'
import giveIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png'
import { http } from '../../services/http'

export const Landing = () => {
  const [connections, setConnections] = useState<number>(0)
  const { navigate } = useNavigation()
  const handleNavigateToGiveClassPage = useCallback(() => {
    navigate('GiveClasses')
  }, [navigate])

  const handleNavigateToStudyPages = useCallback(() => {
    navigate('Study')
  }, [navigate])

  useEffect(() => {
    http.get('connections')
      .then(response => setConnections(response.data.total))
  }, [])
  return (
    <View style={styles.container}>
      <Image source={landingIcon} style={styles.banner}/>
      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>
          O que deseja fazer?
        </Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress = {handleNavigateToStudyPages}
        >
          <Image source={studyIcon}/>
          <Text style={styles.buttonText}>
            Estudar
          </Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveIcon}/>
          <Text style={styles.buttonText}>
            Dar Aulas
          </Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de {connections} conexões já realizadas {' '}
        <Image source={heartIcon}></Image>
      </Text>
    </View>
  )
}
