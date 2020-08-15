import React, { useCallback, useState } from 'react'
import { View, Image, Text, Linking } from 'react-native'
import { styles } from './styles'
import { RectButton } from 'react-native-gesture-handler'
import heartOutline from '../../assets/images/icons/heart-outline.png'
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsapp from '../../assets/images/icons/whatsapp.png'
import AsyncStorage from '@react-native-community/async-storage'
import { http } from '../../services/http'

export interface Teacher{
  id: number
  name: string,
  bio: string,
  avatar: string,
  subject: string,
  cost: number,
  whatsapp: string
}

interface TeacherProps {
 teacher: Teacher
 favoritesProp: boolean
}

export const TeacherItem:React.FC<TeacherProps> = ({ teacher, favoritesProp }) => {
  const [isFavorite, setIsFavorite] = useState(favoritesProp)
  const sendMessage = useCallback(() => {
    http.post('connections', {
      user_id: teacher.id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }, [])

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = []
    if (favorites) {
      favoritesArray = JSON.parse(favorites)
    }
    if (isFavorite) {
      const id = favoritesArray.findIndex((item:Teacher) => item.id === teacher.id)
      favoritesArray.splice(id, 1)
      setIsFavorite(false)
    } else {
      if (favorites) {
        favoritesArray = JSON.parse(favorites)
      }
      favoritesArray.push(teacher)
      setIsFavorite(true)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image
          style = {styles.avatar}
          source = {{ uri: teacher.avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={styles.bio}>
        {teacher.bio}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/Hora {'   '}
          <Text style={styles.priceValue}>{teacher.cost}</Text>
        </Text>
        <View style={styles.buttonsContainer}>
          <RectButton onPress={handleToggleFavorite} style={[
            styles.favoriteButton,
            isFavorite ? styles.favorited : {}
          ]}>
            {isFavorite
              ? <Image source={unFavoriteIcon}/>
              : <Image source={heartOutline}/>
            }

          </RectButton>

          <RectButton style={styles.contactButton} onPress={sendMessage}>
            <Image source={whatsapp}/>
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  )
}
