import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Section } from './ShowTile.styles'

const ShowTile = ({id, img, title, venue, description, price, date}) => {
  const navigate = useNavigate()
  const accessVideoHandler = () => {
      navigate('/bookshow', {state:{id, img, title, venue, description, price, date}})        
  }

  return (
    <Section onClick={accessVideoHandler} >
        <img src={img} alt={title} />
        <h3>{title}</h3>
        <h4>{venue}</h4>
    </Section>
  )
}

export default ShowTile
