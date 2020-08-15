import React, { TextareaHTMLAttributes } from 'react'
import './styles.css'
interface TextProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
  name:string,
  label:string
}
export const Textarea:React.FC<TextProps> = ({ name, label, ...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea name={name} {...rest}/>
    </div>
  )
}
