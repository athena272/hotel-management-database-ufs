CREATE DATABASE hotel_management;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criando as tabelas

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS hotel_management.usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS hotel_management.clientes (
  id_cliente SERIAL PRIMARY KEY,
  endereco VARCHAR(255) NOT NULL,
  telefone VARCHAR(15) NOT NULL,
  id_usuario INT, -- Relacionamento com a tabela de usuários
  FOREIGN KEY (id_usuario) REFERENCES hotel_management.usuarios(id_usuario) -- Chave estrangeira para a tabela de usuários
);

-- Tabela de hoteleiros
CREATE TABLE IF NOT EXISTS hotel_management.hoteleiros (
  id_hoteleiro SERIAL PRIMARY KEY,
  empresa VARCHAR(255) NOT NULL,
  id_usuario INT, -- Relacionamento com a tabela de usuári
  FOREIGN KEY (id_usuario) REFERENCES hotel_management.usuarios(id_usuario) -- Chave estrangeira para a tabela de usuários
);

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS hotel_management.administradores (
  id_admin SERIAL PRIMARY KEY,
  cargo VARCHAR(255) NOT NULL,
  area VARCHAR(255) NOT NULL,
  id_usuario INT, -- Relacionamento com a tabela de usuários
  FOREIGN KEY (id_usuario) REFERENCES hotel_management.usuarios(id_usuario) -- Chave estrangeira para a tabela de usuários
);

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id_categoria UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL
);

-- Tabela de hoteis
CREATE TABLE IF NOT EXISTS hoteis (
  id_hotel UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(255) NOT NULL UNIQUE,
  endereco VARCHAR(255) NOT NULL UNIQUE,
  numero_de_quartos INT NOT NULL,
  id_categoria UUID, -- Relacionamento com a tabela de categorias
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) -- Chave estrangeira para a tabela de categorias
);

-- Tabela de aeroportos
CREATE TABLE IF NOT EXISTS hotel_management.aeroportos (
  id_aeroporto SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  IATA VARCHAR(255) NOT NULL,
  endereco VARCHAR(255) NOT NULL
);

-- Tabela de quartos
CREATE TABLE IF NOT EXISTS hotel_management.quartos (
  id_quarto SERIAL PRIMARY KEY,
  tipo VARCHAR(255) NOT NULL,
  preco_por_noite NUMERIC NOT NULL,
  descricao TEXT NOT NULL,
  id_hotel INT, -- Relacionamento com a tabela de hoteis
  FOREIGN KEY (id_hotel) REFERENCES hotel_management.hoteis(id_hotel) -- Chave estrangeira para a tabela de hoteis
);

-- Tabela de reservas
CREATE TABLE IF NOT EXISTS hotel_management.reservas (
  id_reserva SERIAL PRIMARY KEY,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  preco NUMERIC NOT NULL,
  id_usuario INT, -- Relacionamento com a tabela de usuários
  id_hotel INT, -- Relacionamento com a tabela de hoteis
  FOREIGN KEY (id_usuario) REFERENCES hotel_management.usuarios(id_usuario), -- Chave estrangeira para a tabela de usuários
  FOREIGN KEY (id_hotel) REFERENCES hotel_management.hoteis(id_hotel) -- Chave estrangeira para a tabela de hoteis
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS hotel_management.avaliacoes (
  id_avaliacao SERIAL PRIMARY KEY,
  comentario TEXT NOT NULL,
  classificacao INT NOT NULL,
  data_avaliacao DATE NOT NULL,
  id_cliente INT, -- Relacionamento com a tabela de clientes
  id_hotel INT, -- Relacionamento com a tabela de hoteis
  FOREIGN KEY (id_cliente) REFERENCES hotel_management.clientes(id_cliente), -- Chave estrangeira para a tabela de clientes
  FOREIGN KEY (id_hotel) REFERENCES hotel_management.hoteis(id_hotel) -- Chave estrangeira para a tabela de hoteis
);

-- Tabela de pagamentos
CREATE TABLE IF NOT EXISTS hotel_management.pagamentos (
  id_pagamento SERIAL PRIMARY KEY,
  valor NUMERIC NOT NULL,
  data DATE NOT NULL,
  tipo_cartao VARCHAR(255) NOT NULL,
  id_reserva INT, -- Relacionamento com a tabela de reservas
  FOREIGN KEY (id_reserva) REFERENCES hotel_management.reservas(id_reserva) -- Chave estrangeira para a tabela de reservas
);

-- Tabela de promoções
CREATE TABLE IF NOT EXISTS hotel_management.promocoes (
  id_promocao SERIAL PRIMARY KEY,
  descricao TEXT NOT NULL,
  desconto NUMERIC NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  id_hotel INT, -- Relacionamento com a tabela de hoteis
  FOREIGN KEY (id_hotel) REFERENCES hotel_management.hoteis(id_hotel) -- Chave estrangeira para a tabela de hoteis
);

-- Tabela de eventos
CREATE TABLE IF NOT EXISTS hotel_management.eventos (
  id_evento SERIAL PRIMARY KEY,
  nome_evento VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  id_hotel INT, -- Relacionamento com a tabela de hoteis
  FOREIGN KEY (id_hotel) REFERENCES hotel_management.hoteis(id_hotel) -- Chave estrangeira para a tabela de hoteis
);

