CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    endereco VARCHAR(200),
    cidade VARCHAR(100),
    estado VARCHAR(50),
    cep VARCHAR(10),
    data_cadastro DATE NOT NULL,
    ativo BOOLEAN NOT NULL
);

CREATE TABLE pedido (
    id SERIAL PRIMARY KEY,
    id_cliente INTEGER NOT NULL,
    data_pedido DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    detalhes TEXT,
    valor DECIMAL(10, 2) NOT NULL,

    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);
