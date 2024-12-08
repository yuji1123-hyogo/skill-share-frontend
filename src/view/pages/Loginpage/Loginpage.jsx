import React, { useState } from 'react'
import "./Loginpage.css"
import { Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginActionCreater } from './../../../model/redux/currentUserSlice';


function Loginpage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loginErr,setLoginErr] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const hundleSubmit = async (e) => {
    e.preventDefault();
    setLoginErr(null)
    try{
      const resultAction = await dispatch(loginActionCreater({email,password}));
      if (loginActionCreater.fulfilled.match(resultAction)) {
        console.log("ログイン成功:", resultAction.payload);
        navigate("/")
      } else {
         setLoginErr(resultAction.payload || "ログインに失敗しました。");
      }
    }catch(e){
      setLoginErr("ログイン処理中にエラーが発生しました")
    }
  }

  return (
    <>
    <div className='Login'>
      <div className='Login__left'>
        <p className='Login__left__apptitle'>SNS</p>
        <p className='Login__left__greeting'>ようこそ</p>
      </div>
      <div className='Login__right'>
        <form className='Login__right__form' onSubmit={hundleSubmit}>

          <h3  className='Login__right__form__intro'>ログインはこちら</h3>
          <label htmlFor='email' >Eメール</label>
          <input  id= "email" placeholder="Eメール"  value={email} type="email"  onChange={(e)=>setEmail(e.target.value)} className="Login__right__form__input"/>
          
          <label htmlFor='password' >パスワード</label>
          <input  id= "password" placeholder="パスワード" type="password"   value={password}   onChange={(e)=>setPassword(e.target.value)}  className="Login__right__form__input"/> 
           {loginErr && <p style={{ color: "red" }}>{loginErr}</p>}


          <button type="submit"   className="Login__right__form__button--login" >
            ログイン
          </button>
          <p className="Login__right__form__registerintro">新規登録はこちら</p>
          <Link to="/register" className="Login__right__form__button--Link">
            <button className="Login__right__form__button--register">
              新規登録
            </button>
          </Link>
        </form>
      </div>
    </div>
    </>
  )
}

export default Loginpage