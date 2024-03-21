import React from 'react'
import Form from './Form'
import Profile from './Profile'

function Home() {
  return (
    <div>


        <div className="row">

            <div className="col-6">
                <Profile/>
            </div>




            <div className="col-6">


                <Form/>



            </div>



        </div>


    </div>
  )
}

export default Home