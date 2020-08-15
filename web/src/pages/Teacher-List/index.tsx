import React, { useState, useCallback, FormEvent } from 'react'
import { Header } from '../../components/Header'
import { TeacherItem } from '../../components/Teacher-Item'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { http } from '../../services/http'
import { TeacherProps } from '../../components/Teacher-Item/index'
import './styles.css'

export const TeacherList: React.FC = () => {
  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')
  const [teachers, setTeachers] = useState([])

  const searchTeachers = useCallback(async (e:FormEvent) => {
    e.preventDefault()
    const response = await http.get('classes', {
      params: {
        subject,
        week_day: weekDay,
        time
      }
    })
    setTeachers(response.data)
  }, [subject, weekDay, time])
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Estes são os Proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange ={(e) => setSubject(e.target.value)}
            options ={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação-fisica', label: 'Educação-fisica' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
              { value: 'Inglês', label: 'Inglês' },
              { value: 'História', label: 'História' },
              { value: 'Espanhol', label: 'Espanhol' },
              { value: 'Fisica', label: 'Fisica' },
              { value: 'Geografia', label: 'Geografia' },
              { value: 'Filósofia', label: 'Filósofia' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Quimica', label: 'Quimica' }
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={weekDay}
            onChange ={(e) => setWeekDay(e.target.value)}
            options ={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sabádo' }
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange ={(e) => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </Header>
      <main>
        {teachers && teachers.map((teacher : TeacherProps) => {
          return <TeacherItem teacher={teacher} key={teacher.id}/>
        })}
      </main>
    </div>
  )
}
