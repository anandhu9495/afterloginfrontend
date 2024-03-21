import React, { useState } from 'react'
import { logoutAPI, resetPasswordAPI } from '../Services/allAPI';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
  


function Profile() {

    const [newPassword, setNewPassword] = useState('')


    const [basicModal, setBasicModal] = useState(false);

  const toggleOpen = () => setBasicModal(!basicModal);


    const existUser = JSON.parse(sessionStorage.getItem('existUser'))

    const handleLogout = async () => {
        try {
            await logoutAPI();
            sessionStorage.removeItem('existUser')
            window.location.href = '/login'
        } catch (error) {
            console.error('error is', error)
            
        }
    }
    const handlePassword = async () => {
        try {
            await resetPasswordAPI(existUser.userId, newPassword)
            setNewPassword('')
            toggleOpen()
            alert('password changed successfully')
        } catch (error) {
            console.error('error is ', error)
            
        }
    };

  return (
    <div>


        <h1 className='m-4'>welcom to profile</h1>

        <h2 style={{marginLeft:'20px'}}>Name : {existUser.name}</h2>
        <h2 style={{marginLeft:'20px'}}>Address: {existUser.address}</h2>
        <h2 style={{marginLeft:'20px'}}>Gender: {existUser.gender}</h2>

        <button style={{marginLeft:'20px'}} className='btn btn-danger' onClick={handleLogout}>Logout</button>


        <MDBBtn style={{marginLeft:'20px',marginTop:"20px"}} onClick={toggleOpen}>Reset password</MDBBtn>
      <MDBModal open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody><input value={newPassword}  onChange={(e) => setNewPassword(e.target.value)} type="text" /></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handlePassword}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

        



    </div>
  )
}

export default Profile