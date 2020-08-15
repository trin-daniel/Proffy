import React, { useCallback } from 'react'
import WhatsappIcon from '../../assets/icons/whatsapp.svg'
import './styles.css'
import { http } from '../../services/http'
interface TeacherItemProps {
  teacher: TeacherProps
}
export interface TeacherProps{
  id:number,
  name:string,
  cost:number,
  avatar:string,
  bio:string,
  subject:string,
  whatsapp:string
}
export const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  const createConnection = useCallback(async () => {
    await http.post('connections', {
      user_id: teacher.id
    })
  }, [teacher.id])
  return (
    <article className="teacher-item">
      <header>
        <img
          src={teacher.avatar}
          alt={teacher.name}
        />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>
        {teacher.bio}
      </p>
      <footer>
        <p>Preço/Hora
          <strong>{teacher.cost}</strong>
        </p>

        <a href={`https://wa.me/${teacher.whatsapp}`} onClick={createConnection}>
          <img
            src={WhatsappIcon}
            alt="Botão com icone do whatsapp"
          />
            Entrar em contato
        </a>
      </footer>
    </article>
  )
}
