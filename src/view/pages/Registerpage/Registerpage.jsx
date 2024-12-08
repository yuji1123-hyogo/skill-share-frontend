import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./Registerpage.css"
import { checkExistUserNameApiCrient, registerApiCrient } from '../../../model/httpApiCrients/authApiCrient';
const API_URL="http://localhost:5000/api"

function Registerpage() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [username,setUsername] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [inputErrors, setInputErrors] = useState({});
  const navigate = useNavigate();
  const [usernameExists, setUsernameExists] = useState(null); // null: 未確認, true: 存在, false: 未存在
  const [isChecking, setIsChecking] = useState(false); // API呼び出し中の状態

  const registerValidate =()=>{
    const errors ={}
    if(!email) errors.email ="Eメールを入力してください"
    if(!username) errors.username ="ユーザー名を入力してください"
    if(!password) errors.password ="パスワードを入力してください"
    if(!confirmPassword) errors.confirmPassword="確認用パスワードを入力してください"
    if (password !== confirmPassword) {
      errors.confirmPassword = "パスワードが一致しません";
    }
    //errorをステートに保存
    setInputErrors(errors);
    //入力内容に誤りがなければtrue
    return Object.keys(errors).length === 0;
  }


  const registerCall = async()=>{
    //errorがあれば中断
    if (!registerValidate ()) return;
    try{
      const response =await registerApiCrient({username:username,email:email,password:password})
      window.alert(response.data.message)
      navigate("/login");
    }catch(e){
      const serverErrorMessage = e.response?.data?.message || "予期しないエラーが発生しました";
      console.log(serverErrorMessage);
      window.alert(serverErrorMessage);
    }

  }

  const hundleSubmit=(e)=>{
    e.preventDefault();
    registerCall();
  }



    // ユーザー名変更時の処理
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
      setUsernameExists(null); // 新しい入力があったら状態をリセット
    };
  

    const checkUsernameExists = async (username) => {
      setIsChecking(true);
      try {
        const response = await checkExistUserNameApiCrient(username)
        setUsernameExists(response.data.exists);
      } catch (error) {
        console.error("ユーザー名確認中にエラーが発生しました:", error);
      } finally {
        setIsChecking(false);
      }
    };

    // デバウンスを実現するためのuseEffect
    useEffect(() => {
      if (username) {
        //Email入力変更があれば0.5ms後に既存かチェック
        const delayDebounceFn = setTimeout(() => {
          checkUsernameExists(username);
        }, 300); // 500msのデバウンス
        return () => clearTimeout(delayDebounceFn); // クリーンアップでタイマーをクリア
      }
    }, [username]);



  return (
    <>
    <div className='Login'>
      <div className='Login__left'>
        <p className='Login__left__apptitle'>SNS</p>
        <p className='Login__left__greeting'>ようこそ</p>
      </div>
      <div className='Login__right'>
        <form className='Login__right__form' onSubmit={hundleSubmit}>

          <h3 className='Login__right__form__intro'>新規登録はこちら</h3>

          <label htmlFor='username' >ユーザー名</label>
          <input  id= "username" placeholder="ユーザー名"  value={username} type="text"  onChange={handleUsernameChange} className="Login__right__form__input"/>
          {inputErrors.username && (<p style={{ color: "red" }}>{inputErrors.username}</p>)}
          {isChecking && <p>確認中...</p>}
          {usernameExists === true && <p style={{color: "red"}} className="error">このユーザー名は既に登録されています</p>}
          {usernameExists === false && <p style={{color: "green"}} className="success">このユーザー名は使用可能です</p>}


          <label htmlFor='email' >Eメール</label>
          <input  id= "email" placeholder="Eメール"  value={email} type="email"  onChange={(e)=>setEmail(e.target.value)} className="Login__right__form__input"/>
          {inputErrors.email && (<p style={{ color: "red" }}>{inputErrors.email}</p>)}      


          <label htmlFor='password' >パスワード</label>
          <input  id= "password" placeholder="パスワード" type="password"   value={password}   onChange={(e)=>setPassword(e.target.value)}  className="Login__right__form__input"/>
          {inputErrors.password && (
          <p style={{ color: "red" }}>{inputErrors.password}</p>
        )}
          <label htmlFor='confirmPassword' >確認用パスワード</label>
          <input  id= "confirmPassword" placeholder="確認用パスワード" type="password"   value={confirmPassword}   onChange={(e)=>setConfirmPassword(e.target.value)}  className="Login__right__form__input"/>
          {inputErrors.confirmPassword && (
          <p style={{ color: "red" }}>{inputErrors.confirmPassword}</p>
        )}
          
          <button type="submit"   className="Login__right__form__button--login" >
            新規登録
          </button>

          <p className="Login__right__form__registerintro">アカウントをお持ちの方はこちら</p>
          <Link to="/login" className='Login__right__form__button--Link'>
            <button className="Login__right__form__button--register">
                ログイン
            </button>
          </Link>
        </form>
      </div>
    </div>
    </>
  )
}

export default Registerpage