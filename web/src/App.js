import React, { useState, useEffect } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

// Componente: Bloco isolado de HTML, CSS ou JS, o qual não interfere no resto da aplicação
// Propriedade: Informações que um componente pai passa para o componente filho
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade). actualiza automaticamente o layout com o setstate

function App() {

  // state
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect( () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);


  async function handleAddDev(e) {
    e.preventDefault();
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Github username</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Technologies</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars0.githubusercontent.com/u/39268783?s=460&v=4"
                alt="Marine Viele"
              />
              <div className="user-info">
                <strong>Marine Viele</strong>
                <span>ReactJs, JS, Java</span>
              </div>
            </header>
            <p>Looking for next job as a react developer</p>
            <a
              href="https://github.com/marineviele"
              target="_blank"
              rel="noopener noreferrer"
            >
              see Github profile
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars0.githubusercontent.com/u/39268783?s=460&v=4"
                alt="Marine Viele"
              />
              <div className="user-info">
                <strong>Marine Viele</strong>
                <span>ReactJs, JS, Java</span>
              </div>
            </header>
            <p>Looking for next job as a react developer</p>
            <a
              href="https://github.com/marineviele"
              target="_blank"
              rel="noopener noreferrer"
            >
              see Github profile
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars0.githubusercontent.com/u/39268783?s=460&v=4"
                alt="Marine Viele"
              />
              <div className="user-info">
                <strong>Marine Viele</strong>
                <span>ReactJs, JS, Java</span>
              </div>
            </header>
            <p>Looking for next job as a react developer</p>
            <a
              href="https://github.com/marineviele"
              target="_blank"
              rel="noopener noreferrer"
            >
              see Github profile
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars0.githubusercontent.com/u/39268783?s=460&v=4"
                alt="Marine Viele"
              />
              <div className="user-info">
                <strong>Marine Viele</strong>
                <span>ReactJs, JS, Java</span>
              </div>
            </header>
            <p>Looking for next job as a react developer</p>
            <a
              href="https://github.com/marineviele"
              target="_blank"
              rel="noopener noreferrer"
            >
              see Github profile
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
