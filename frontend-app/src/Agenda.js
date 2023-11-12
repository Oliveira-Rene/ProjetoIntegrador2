// src/components/AgendamentoColeta.js
import React, { useState } from 'react';
import axios from 'axios';

const AgendamentoColeta = () => {
  const [dadosColeta, setDadosColeta] = useState({
    nome: '',
    endereco: '',
    quantidade: 0,
    coordenadas: { lat: 0, lng: 0 } // Adicione esta propriedade para armazenar as coordenadas
  });

  const handleAddressChange = async (endereco) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: endereco,
          key: 'SUA_CHAVE_DE_API_DO_GOOGLE_MAPS'//colocar chave aqui 
        }
      });

      const { results } = response.data;
      if (results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        setDadosColeta({ ...dadosColeta, coordenadas: { lat, lng } });
      }
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Faça uma solicitação para o backend para agendar a coleta
      const response = await axios.post('http://localhost:3000/agendar-coleta', dadosColeta);
      console.log('Coleta agendada com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao agendar coleta:', error);
    }
  };

  return (
    <div>
      <h2>Agendar Coleta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={dadosColeta.nome} onChange={(e) => setDadosColeta({ ...dadosColeta, nome: e.target.value })} />
        </label>
        <label>
          Endereço:
          <input
            type="text"
            value={dadosColeta.endereco}
            onChange={(e) => {
              setDadosColeta({ ...dadosColeta, endereco: e.target.value });
              handleAddressChange(e.target.value);
            }}
          />
        </label>
        <label>
          Quantidade:
          <input type="number" value={dadosColeta.quantidade} onChange={(e) => setDadosColeta({ ...dadosColeta, quantidade: e.target.value })} />
        </label>
        <button type="submit">Agendar Coleta</button>
      </form>
    </div>
  );
};

export default AgendamentoColeta;
