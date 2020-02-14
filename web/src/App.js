import React, { useState, useEffect } from "react";
import "./resources/css/global.css";
import "./resources/css/App.css";
import "./resources/css/RegisterForm.css";
import "./resources/css/Main.css";
import "./services/api"
import api from "./services/api";
import DevItem from './components/DevItem.js';
import DevForm from './components/DevForm.js';

function App() {

  // state
  const [devs, setDevs] = useState([]);


  useEffect(() => {
    async function loadDevs() {
      const res = await api.get('/devs');
      
      setDevs(res.data);
    }

    loadDevs();
  }, []);
  
  const createDevsList = () => {
    return devs.map(dev => (
      <DevItem key={dev._id} dev={dev}/>
    ));
  };

  async function handleAddDev(data) {

    let res = await api.post('/devs', data);

    setDevs([...devs, res.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Register</strong>
        <DevForm onSubmit={handleAddDev} api={api} devs={devs}/>
      </aside>
      <main>
        <ul>
          {createDevsList()}
        </ul>
      </main>
    </div>
  );
}

export default App;
