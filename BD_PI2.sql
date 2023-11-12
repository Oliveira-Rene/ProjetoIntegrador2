-- Tabela para armazenar informações sobre locais de coleta
CREATE TABLE LocaisDeColeta (
    LocalID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(255),
    Endereco NVARCHAR(255),
    Capacidade INT
);

-- Tabela para armazenar informações sobre pessoas
CREATE TABLE Pessoas (
    PessoaID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(255),
    Email NVARCHAR(255),
    Telefone NVARCHAR(20)
);

-- Tabela para registrar informações sobre coletas
CREATE TABLE Coleta (
    ColetaID INT PRIMARY KEY IDENTITY(1,1),
    LocalID INT, -- Chave estrangeira para o local de coleta
    PessoaID INT, -- Chave estrangeira para a pessoa responsável pela coleta
    Quantidade INT,
    DataHora DATETIME,
    FOREIGN KEY (LocalID) REFERENCES LocaisDeColeta(LocalID),
    FOREIGN KEY (PessoaID) REFERENCES Pessoas(PessoaID)
);