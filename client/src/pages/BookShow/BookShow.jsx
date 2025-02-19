import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navbar, { CreditSvg } from '../../components/Navbar/Navbar'
import { theatrifyUser } from '../../Utils/GlobalConstants';
import { CheckoutForm, Pay, Price, Section, VideoSummary } from './BookShow.styles';

const BookShow = () => {

  const [showDetails, setShowDetails] = useState({
    id: '',
    description: '',
    price: '',
    title: '',
    venue: '',
    img: '',
    date: '',
    // organisation: ''
  })

  const [btnText, setBtnText] = useState('Buy Tickets')

  const [userData, setuserData] = useState({})
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(theatrifyUser));
    setuserData(userData)
  }, [])

  const location = useLocation();

  useEffect(() => {
    setShowDetails({
      id: location.state.id,
      description: location.state.description,
      price: location.state.price,
      title: location.state.title,
      venue: location.state.venue,
      img: location.state.img,
      date: location.state.date,
      // organisation: location.state.organisation
    })

    // const data = axios.get('')
  }, []);

  

  const ticketCheckouthandler = async e => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    }
    const {data} = await axios.post(`http://localhost:8000/api/shows/${showDetails.id}/bookTicket`, {}, config)
    console.log(data);
    // data.user.token = userData.token
    console.log(userData.credits);
    let Credit = userData.credits - showDetails.price
    userData.credits = Credit
    localStorage.setItem(theatrifyUser, JSON.stringify(userData))
    if (data.status === 'success') {
      setBtnText('✨ Sold ✨')
    }
  };

  return (
    <>
    <Navbar/>
    <Section>
        <VideoSummary>
          <h1>Buy Show Tickets</h1>
          <img src={showDetails.img} alt='' />
          <h2>{showDetails.title}</h2>
          <h3>@ {showDetails.venue}</h3>
          <p>
            {showDetails.description}
          </p>
        </VideoSummary>
        <CheckoutForm>
          <form onSubmit={ticketCheckouthandler}>
            <h1>Payment Details</h1>
            <h2>{showDetails.title}</h2>
            <Pay>
              <Price>
                <CreditSvg />
                <span>{showDetails.price} Credits!</span>
              </Price>
              <h3>You have {userData.credits} credits left</h3>
            </Pay>
            <button type='submit'>{btnText}</button>
          </form>
        </CheckoutForm>
      </Section>
    </>
  )
}

export default BookShow