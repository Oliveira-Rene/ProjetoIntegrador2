// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AgendamentoColeta from './components/AgendamentoColeta';
import VisualizacaoColetas from './components/VisualizacaoColetas';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Agendar Coleta</Link>
            </li>
            <li>
              <Link to="/visualizar">Visualizar Coletas</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={AgendamentoColeta} />
        <Route path="/visualizar" component={VisualizacaoColetas} />
      </div>
    </Router>
  );
}

export default App;
