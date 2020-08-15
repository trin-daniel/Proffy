import React from 'react'
import Logo from '../../assets/logo.svg'
import BackIcon from '../../assets/icons/back.svg'
import { Link } from 'react-router-dom'
import './styles.css'
interface HeaderProps {
  title: string
  description?:string
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={BackIcon} alt="Botão voltar"/>
        </Link>
        <img src={Logo} alt="Logo Proffy"/>
      </div>
      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}
        {props.children}
      </div>
    </header>
  )
}
