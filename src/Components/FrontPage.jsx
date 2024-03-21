import React from 'react'
import { Link } from 'react-router-dom'
import Auth from './Auth'

function FrontPage() {
  return (
    <div>


        <h1 style={{marginTop:'100px',textAlign:'center'}}>"Please register to unlock access to our exclusive features and content.</h1>

        <Link to='/login'>
        <button style={{marginBottom:"280px",marginTop:'50px',marginLeft:'700px'}} className='btn btn-primary'>Click Here ...</button>

        </Link>



    </div>
  )
}

export default FrontPage