import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { profileState } from "./utils/recoil/user";
import Main from "./components/Main";
import Login from "./components/login/Login";
import MyComment from "./components/myPage/MyPage";
import SubjectDetail from "./components/subject_detail/SubjectDetail";
import IsLogged from "./components/login/IsLogged";
import Modal from "./components/modal/Modal";
import Empty from "./components/Error/Empty";
import Admin from "./components/admin/Admin";
import AdminCreate from "./components/admin/AdminCreate";
import AdminEdit from "./components/admin/AdminEdit";
import { redirect } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import LoginCheck from "./components/login/LoginCheck";
import ScrollToTop from "./utils/ScrollToTop";



const App = () => {
  const baseUrl = `${process.env.REACT_APP_END_POINT}`;
  const [isLogged, setIsLogged] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(profileState)

  // userInfo.isLogin === false ? <Login /> :
  // const url = new URL(window.location.href);
  // const href = url.href;
  // const accessToken = href.split("token=")[1];
  useEffect(()=>{
        fetch(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("42ence-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  ,[])
  if (window.location.protocol === 'https:' && process.env.NODE_ENV === 'development') {
    // 개발 환경에서만 HTTP 요청을 허용
    // 리액트 개발 서버에 프록시 설정을 통해 HTTPS로 전달되는 요청을 HTTP로 변경하는 방법이 있음
    process.env.REACT_APP_API_BASE_URL = 'http://api.example.com';}

  return (
  <>
    <Router>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<LoginCheck/>} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/:circle/:sbj_name" element={<SubjectDetail/>} />
      <Route path="/profile/:intraId" element={<MyComment/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/admin/:sbj_name" element={<AdminEdit />}></Route>
      <Route path="/admin/create" element={<AdminCreate/>} />
      <Route path="/*" element={<Empty/>} />
      <Route path="/error" element={<Empty/>} />
    </Routes>
    </Router>
    <Modal/>
    </>
  );
};

export default App;
