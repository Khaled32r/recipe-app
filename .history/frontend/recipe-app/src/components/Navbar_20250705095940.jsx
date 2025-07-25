import React, { useState } from 'react'
import logo from '../assets/logo.png'
import Modal from './Modal'
import InputForm from './InputForm'
function Navbar() {

  const [isOpen, setIsOpen] = useState(false)
  const checkLogin = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

 
  return (
    <>
    <header>
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
                
           
            <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/myRecipes"> My Recipes</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li onClick={checkLogin}>login</li>
            </ul>
        </nav>

    </header>
    {isOpen && <Modal onClose={closeModal} ><InputForm/></Modal>}

    </>
  )
}

export default Navbar