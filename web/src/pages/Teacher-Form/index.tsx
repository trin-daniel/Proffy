import React,
{
  useCallback,
  useState,
  FormEvent
} from 'react'
import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { Select } from '../../components/Select'
import { http } from '../../services/http'
import Warning from '../../assets/icons/warning.svg'
import './styles.css'
import { useHistory } from 'react-router-dom'

export const TeacherForm: React.FC = () => {
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')
  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [schedule, setSchedule] = useState([{
    week_day: new Date().getDay(),
    from: '',
    to: ''
  }])

  const history = useHistory()

  const handleSchedule = useCallback(() => {
    setSchedule([...schedule, { week_day: 0, from: '', to: '' }])
  }, [schedule])

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault()
    const data = { name, avatar, whatsapp, bio, subject, cost, schedule }
    http.post('classes', data)
      .then(() => {
        alert('Sucesso no cadastro!')
        history.push('/')
      })
      .catch(() => {
        alert('A operação falhou :(')
      })
  }, [name, avatar, whatsapp, bio, subject, cost, schedule, history])

  const setScheduleItemValue = useCallback(
    (position:number, field:string, value:string) => {
      const updateSchedule = schedule.map((scheduleItem, index) => {
        if (index === position) {
          return { ...scheduleItem, [field]: value }
        }
        return scheduleItem
      })
      setSchedule(updateSchedule)
    }, [schedule])

  return (
    <div id="page-teacher-form" className="container">
      <Header
        title="Que incrivel que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrisão"
      />
      <main>
        <form
          onSubmit={handleSubmit}
        >
          <fieldset>
            <legend>Seus Dados</legend>
            <Input
              type="text"
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <Input
              type="text"
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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
            <Input
              type="text"
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <legend>
            Hórarios dísponiveis
              <button type="button" onClick={handleSchedule}>
              + Novo Hórario
              </button>
            </legend>
            {schedule && schedule.map((item, index) => {
              return (
                <div className="schedule-item" key={item.week_day}>
                  <Select
                    name="week_day"
                    label="Dia da semana"
                    onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                    value={item.week_day}
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
                    name="from"
                    label="Das"
                    type="time"
                    value={item.from}
                    onChange={(e) => setScheduleItemValue(index, 'from', e.target.value)}
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={item.to}
                    onChange={(e) => setScheduleItemValue(index, 'to', e.target.value)}
                  />
                </div>
              )
            })}
          </fieldset>
          <fieldset>
            <footer>
              <p>
                <img src={Warning} alt="Aviso importante"/>
              Importante!<br/>
              Preencha todos os campos.
              </p>
              <button type="submit">Salvar cadastro</button>
            </footer>
          </fieldset>
        </form>
      </main>
    </div>
  )
}
