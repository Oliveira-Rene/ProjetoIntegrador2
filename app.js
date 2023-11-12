const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());

// Usuário e senha para autenticação básica 
const usuarioPadrao = 'seu-usuario';
const senhaPadrao = 'sua-senha';

// Configurações de conexão com o SQL Server, incluir informações do Azure aqui
const config = {
  user: 'seu-usuario',
  password: 'sua-senha',
  server: 'seu-servidor',
  database: 'seu-banco-de-dados',
  options: {
    encrypt: true, // Se estiver usando Azure
  },
};

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const { usuario, senha } = req.headers;

  // Verificar autenticação básica (substitua por um método mais seguro)
  if (usuario === usuarioPadrao && senha === senhaPadrao) {
    next(); // Avançar para a próxima rota se autenticado com sucesso
  } else {
    res.status(401).json({ error: 'Autenticação falhou' });
  }
};

// Rota de login
app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  // Verificar credenciais (substitua por um método mais seguro)
  if (usuario === usuarioPadrao && senha === senhaPadrao) {
    res.json({ message: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ error: 'Login falhou' });
  }
});

// Rota para cadastrar clientes
app.post('/clientes', authenticate, async (req, res) => {
  try {
    await sql.connect(config);
    const { nome, email, telefone } = req.body;
    const result = await sql.query`INSERT INTO Clientes (Nome, Email, Telefone) VALUES (${nome}, ${email}, ${telefone})`;
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    sql.close();
  }
});

// Outras rotas para agendamento de coletas, rastreamento de rotas e consulta de histórico de coleta podem ser adicionadas de maneira semelhante.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
