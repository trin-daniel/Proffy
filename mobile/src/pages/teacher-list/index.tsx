import React, { useState, useCallback } from 'react'
import { View, TextInput, Text } from 'react-native'
import { styles } from './styles'
import { Header } from '../../components/header'
import { TeacherItem, Teacher } from '../../components/teacher-item'
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { http } from '../../services/http'
import AsyncStorage from '@react-native-community/async-storage'
export const TeacherList = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [subject, setSubject] = useState<string>('')
  const [week_day, setWeek_day] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [teachersList, setTeachersList] = useState<[]>([])

  function loadFavorites () {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favoritesTeachers = JSON.parse(response)
        const id = favoritesTeachers.map((teacher: Teacher) => teacher.id)
        setFavorites(id)
      }
    })
  }

  const search = useCallback(async () => {
    loadFavorites()
    const response = await http.get('classes', {
      params: {
        week_day,
        subject,
        time
      }
    })
    setTeachersList(response.data)
    setVisible(false)
  }, [week_day, subject, time])

  return (
    <View style={styles.container}>
      <Header
        title="Professores dísponiveis"
        icon={(
          <BorderlessButton onPress={() => setVisible(!visible)}>
            <Feather name="filter" color="#FFF" size={20}/>
          </BorderlessButton>
        )}
      >
        {visible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual á matéria?"
              placeholderTextColor="#C1BCCC"
              value={subject}
              onChangeText = {text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Matéria</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#C1BCCC"
                  value={week_day}
                  onChangeText = {text => setWeek_day(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Hórario</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Que horas?"
                  placeholderTextColor="#C1BCCC"
                  value={time}
                  onChangeText = {text => setTime(text)}
                />
              </View>
            </View>
            <RectButton style={styles.buttonSubmit} onPress={search}>
              <Text style={styles.buttonSubmitText}>Filtar</Text>
            </RectButton>
          </View>
        )}
      </Header>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
      >
        {teachersList.map((item:Teacher) => {
          return (
            <TeacherItem
              key={item.id}
              teacher={item}
              favoritesProp={favorites.includes(item.id)}
            />
          )
        })}

      </ScrollView>
    </View>
  )
}
