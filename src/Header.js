import React from 'react'

const Header = ({title}) => {

  return (
    <header >
      <h1>{title}</h1>
    </header>
  )
  
}
  Header.defaultPros = {
    title: 'Default Title'

}

export default Header
