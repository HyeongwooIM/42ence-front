import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Modal from "./components/modal/Modal";
import { RecoilRoot } from "recoil";

import ErrorChecker from "./components/Error/ErrorChecker";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
if (window.location.protocol === 'https:' && process.env.NODE_ENV === 'development') {
  // 개발 환경에서만 HTTP 요청을 허용
  // 리액트 개발 서버에 프록시 설정을 통해 HTTPS로 전달되는 요청을 HTTP로 변경하는 방법이 있음
  process.env.REACT_APP_API_BASE_URL = `${process.env.REACT_APP_END_POINT}`;
root.render(
  // <React.StrictMode>
  <RecoilRoot>
      <App />
      <Modal />
  </RecoilRoot>
  // </React.StrictMode>
);

reportWebVitals();
