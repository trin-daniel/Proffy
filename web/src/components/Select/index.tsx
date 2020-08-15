import React, { SelectHTMLAttributes } from 'react'
import './styles.css'
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  name: string
  label:string
  options: Array<{
    value:string,
    label:string
  }>
}

export const Select:React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} {...rest}>
        <option value="">Selecione uma opcão</option>
        {options && options.map(item => {
          return (
            <option
              key={item.label}
              value={item.value}
            >
              {item.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}
