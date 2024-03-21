import React, { useState } from 'react';
import { loginAPI, registerAPI } from '../Services/allAPI';
import { Link, useNavigate } from 'react-router-dom';

function Auth({ register }) {
  const location = useNavigate();
  const isRegisterForm = register ? true : false;
  const [userData, setUserData] = useState({
    name: '',address: '',gender: '',username: '',email: '',password: '',
  });

  const registerData = async () => {
    const { name, address, gender, username, password } = userData;

    if (!name || !address || !gender || !username || !password) {
      alert('Please fill all the fields');
    } else {
      const result = await registerAPI(userData);
      console.log(result);

      if (result.status === 200) {
        alert(result.data);
        location('/login');
      } else {
        console.log(result.response.data);
      }
    }
  };

  const loginData = async () => {
    const { username, password } = userData;

    if (!username || !password) {
      alert('Please fill all the fields');
    } else {
      const result = await loginAPI(userData);
      console.log(result);

      if (result.status === 200) {
        alert('login successfully');
        sessionStorage.setItem("existUser",JSON.stringify(result.data.user))
        sessionStorage.setItem('token',result.data.token)
        location('/home')
      } else {
        alert(result.response.data);
      }
    }
  };

  return (
    <div>

        <div className="row">

            <div className="col-6">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/woman-login-into-banking-app-5194430-4341049.png" alt="" />
            </div>


            <div className="col-6">


      <h3 className='mt-4 mb-5'>{isRegisterForm ? 'Register Here' : 'Login Here'}</h3>

      <form>
        {isRegisterForm && (
          <>
            <input
              value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} type="text" placeholder="Name" className="form-control w-50 mb-3"
            />
            <input
              value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })}   type="text" placeholder="Address" className="form-control w-50 mb-3"
            />
            <input
              value={userData.gender} onChange={(e) => setUserData({ ...userData, gender: e.target.value })} type="text" placeholder="Gender" className="form-control w-50 mb-3"
            />
          </>
        )}
        <input
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="text" placeholder="Username" className="form-control w-50  mb-3"
        />
       
        <input
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" className="form-control w-50 mb-3"
        />
      </form>

      {isRegisterForm ? (
        <div>
          <button onClick={registerData} className="btn btn-success">
            Register
        </button>
          <Link to="/login">Already registered? Please login</Link>
        </div>
      ) : (
        <div>
          <button onClick={loginData} className="btn btn-success">
            Login
           </button>
          <Link to="/register">New here? Please register</Link>
        </div>
      )}

</div>


    </div>
    </div>
  );
}

export default Auth;
