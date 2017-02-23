import React, {Component} from 'react';
import crypto from 'crypto';

export default class App extends Component {
  render() {
    const dataFetch = (url, method='get', headers=null, body=null) => (
      fetch(url, {
        method, headers, body: JSON.stringify(body)
      }).then(res => res.json())
    );
    const getAjax = () => {
      const headers = {
        'Content-Type': 'application/json'
      };
      const body = {
        id: 'admin',
        pw: crypto.createHmac('sha1', 'SeCrEtKeYfOrHaShInG')
                  .update('1234')
                  .digest('base64')
      };
      let token;
      dataFetch('/api/auth/login', 'post', headers, body).
      then(({token, message}= data) => {
        if(!token) return alert(message);
        sessionStorage.setItem('token', token)
      })
    };
    const login = () => {
      const headers = {
        'x-access-token': sessionStorage.getItem('token')
      };
      dataFetch('/api/auth/check', 'post', headers).
      then(({success} = data) => {
        if(!success) return alert('로그인 하세용!');
        alert('로그인 성공!');
      });
    };
    return (
      <div>
        <button onClick={getAjax}>눌러봐!</button><br />
        <input type="text" />
        <input type="password" />
        <button onClick={login}>로aa그인!</button>
      </div>
    );
  }
}
