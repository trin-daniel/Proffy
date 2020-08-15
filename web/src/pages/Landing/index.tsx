import React,
{
  useState,
  useEffect
} from 'react'
import { Link } from 'react-router-dom'
import { http } from '../../services/http'
// Images
import Logo from '../../assets/logo.svg'
import LandingImage from '../../assets/landing.svg'
import StudyIcon from '../../assets/icons/study.svg'
import GiveClassesIcon from '../../assets/icons/give-classes.svg'
import PurpleHeartIcon from '../../assets/icons/purple-heart.svg'
import './styles.css'

export const Landing: React.FC = () => {
  const [
    totalConnections,
    setTotalConnections
  ] = useState(0)

  useEffect(() => {
    http.get('connections')
      .then(response => setTotalConnections(response.data.total))
  }, [totalConnections])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={Logo} alt="Imagem Proffy"/>
          <h2>Sua plataforma de estudos online</h2>
        </div>
        <img src={LandingImage} alt="Plataforma de estudos" className="hero-image"/>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={StudyIcon} alt="Estudar"/>
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={GiveClassesIcon} alt="Dar aulas"/>
            Dar Aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections && totalConnections} conexões realizadas.
          <img src={PurpleHeartIcon} alt="coração roxo"/>
        </span>
      </div>
    </div>
  )
}
