import React from 'react'
import
{
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { TeacherList } from '../pages/teacher-list'
import { Favorites } from '../pages/favorites'
import { Ionicons } from '@expo/vector-icons'

const {
  Navigator,
  Screen
} = createBottomTabNavigator()

export const StudyTabs = () => {
  return (
    <Navigator tabBarOptions={{
      style: {
        elevation: 0,
        shadowOpacity: 0,
        height: 64
      },
      tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      },
      iconStyle: {
        flex: 0,
        width: 20,
        height: 20
      },
      labelStyle: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        marginLeft: 16
      },
      inactiveBackgroundColor: '#FAFAFC',
      activeBackgroundColor: '#EBEBF5',
      inactiveTintColor: '#c1BCCC',
      activeTintColor: '#32264D'

    }}>
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Professores',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-person"
                size={size}
                color={focused ? '#8257E5' : color}
              />
            )
          }
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-heart"
                size={size}
                color={focused ? '#8257E5' : color}
              />
            )
          }
        }}
      />
    </Navigator>
  )
}
