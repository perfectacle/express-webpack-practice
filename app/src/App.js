import React, {Component} from 'react';

export default class App extends Component {
  render() {
    const dataFetch = (url, method='get', body=null) => (
      fetch(url, {
        method, body
      }).then(res => res.json())
    );
    const getAjax = () => {
      dataFetch('/users').then(data => console.dir(data));
    };
    const login = () => {
      dataFetch('/login/admin/1234', 'get').then(data => console.dir(data));
    };
    return (
      <div>
        <button onClick={getAjax}>눌러봐!</button><br />
        <input type="text" />
        <input type="password" />
        <button onClick={login}>로그인!</button>
      </div>
    );
  }
}
