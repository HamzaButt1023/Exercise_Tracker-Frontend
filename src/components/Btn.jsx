import React from 'react'
import './css/btn.css';

export default function Btn(props) {
  const { type ,title, style } = props;
  return (
    <button type={type} className='fitprism-btn text-white fw-bold fs-5 rounded-0 border-0 mx-auto' style={style}>{title}</button>
  )
} 