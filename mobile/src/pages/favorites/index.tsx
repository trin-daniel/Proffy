import React, { useState, useEffect } from 'react'
import
{
  View,
  ScrollView,
  AsyncStorage
} from 'react-native'
import
{
  TeacherItem,
  Teacher
} from '../../components/teacher-item'
import { styles } from './styles'
import { Header } from '../../components/header'
import { useFocusEffect } from '@react-navigation/native'

export const Favorites = () => {
  const [favorites, setFavorites] = useState([])

  useFocusEffect(React.useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritesTeachers = JSON.parse(response)
        setFavorites(favoritesTeachers)
      }
    })
  }, []))
  return (
    <View style={styles.container}>
      <Header title="Meus Favoritos"/>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      >
        {favorites && favorites.map((item:Teacher) => {
          return (
            <TeacherItem
              key={item.id}
              teacher={item}
              favoritesProp
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
