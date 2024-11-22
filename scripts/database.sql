create database if not exists Pousada_Ypua;
USE Pousada_Ypua;

CREATE TABLE IF NOT EXISTS pessoa(
	id INT AUTO_INCREMENT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    login VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nasc DATE NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS funcionario (
	id INT AUTO_INCREMENT NOT NULL,
    id_pessoa INT NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    data_admissao DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_pessoa)
    REFERENCES pessoa(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS hospede (
	id INT AUTO_INCREMENT NOT NULL,
    id_pessoa INT NOT NULL,
    data_criacao_conta DATE NOT NULL,
    ultimo_login DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_pessoa) 
    REFERENCES pessoa(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS acomodacao (
	id INT AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    numero_camas INT NOT NULL,
    descricao_comodidades TEXT NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    disponibilidade BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);
    
CREATE TABLE IF NOT EXISTS reserva (
	id INT AUTO_INCREMENT NOT NULL,
    id_hospede INT NOT NULL,
    id_acomodacao INT NOT NULL,
    id_funcionario INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor DECIMAL(10,2),
    metodo_pgto VARCHAR(255) NOT NULL,
    status_reserva BOOLEAN NOT NULL,
    preferencias VARCHAR(255) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(id_hospede)
    REFERENCES hospede(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    FOREIGN KEY(id_acomodacao)
    REFERENCES acomodacao(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT,
    FOREIGN KEY(id_funcionario)
    REFERENCES funcionario(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT
);


-- Usuario cujo site utilizara durante as sessões
CREATE USER IF NOT EXISTS 'programa'@'localhost' IDENTIFIED BY 'desabilitaSenha301'; 
GRANT select, insert, update, delete ON Pousada_Ypua.* TO 'programa'@'localhost';

-- AUDITORIAS


CREATE TABLE IF NOT EXISTS auditoria_pessoa (
	auditoria_id INT AUTO_INCREMENT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao TIMESTAMP NOT NULL,
    id INT NOT NULL,
    nome VARCHAR(255) NOT NULL, 
    cpf VARCHAR(11) NOT NULL,
    login varchar(255) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_nasc VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY(auditoria_id)
);

CREATE TRIGGER insert_pessoa AFTER INSERT
ON pessoa FOR EACH ROW
	INSERT INTO auditoria_pessoa(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES ("I", now(), NEW.id, NEW.nome, NEW.cpf, NEW.login, NEW.senha, NEW.data_nasc, NEW.telefone, NEW.email);

CREATE TRIGGER update_pessoa AFTER UPDATE
ON pessoa FOR EACH ROW
	INSERT INTO auditoria_pessoa(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES 	("UA", now(), OLD.id, OLD.nome, OLD.cpf, OLD.login, OLD.senha, OLD.data_nasc, OLD.telefone, OLD.email),
		("UZ", now(), NEW.id, NEW.nome, NEW.cpf, NEW.login, NEW.senha, NEW.data_nasc, NEW.telefone, NEW.email);

CREATE TRIGGER delete_pessoa AFTER DELETE
ON pessoa FOR EACH ROW
	INSERT INTO auditoria_pessoa(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES 	("D", now(), OLD.id, OLD.nome, OLD.cpf, OLD.login, OLD.senha, OLD.data_nasc, OLD.telefone, OLD.email);


CREATE TABLE IF NOT EXISTS auditoria_funcionario (
	auditoria_id INT AUTO_INCREMENT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao TIMESTAMP NOT NULL,
	id INT NOT NULL,
    id_pessoa INT NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    salario DECIMAL(10, 2) NOT NULL,
    data_admissao DATE NOT NULL,
    PRIMARY KEY(auditoria_id)
);

CREATE TRIGGER insert_funcionario AFTER INSERT
ON funcionario FOR EACH ROW
	INSERT INTO auditoria_funcionario(operacao, data_operacao, id, id_pessoa, cargo, salario, data_admissao)
VALUES ("I", now(), NEW.id, NEW.id_pessoa, NEW.cargo, NEW.salario, NEW.data_admissao);

CREATE TRIGGER update_funcionario AFTER UPDATE
ON funcionario FOR EACH ROW
	INSERT INTO auditoria_funcionario(operacao, data_operacao, id, id_pessoa, cargo, salario, data_admissao)
VALUES 	("UA", now(), OLD.id, OLD.id_pessoa, OLD.cargo, OLD.salario, OLD.data_admissao),
		("UZ", now(), NEW.id, NEW.id_pessoa, NEW.cargo, NEW.salario, NEW.data_admissao);

CREATE TRIGGER delete_funcionario AFTER DELETE
ON funcionario FOR EACH ROW
	INSERT INTO auditoria_funcionario(operacao, data_operacao, id, id_pessoa, cargo, salario, data_admissao)
VALUES ("D", now(), OLD.id, OLD.id_pessoa, OLD.cargo, OLD.salario, OLD.data_admissao);


CREATE TABLE IF NOT EXISTS auditoria_hospede (
	auditoria_id INT AUTO_INCREMENT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao DATE NOT NULL,
    id INT NOT NULL,
    id_pessoa INT NOT NULL,
    data_criacao_conta DATE NOT NULL,
    ultimo_login DATE NOT NULL,
    PRIMARY KEY(auditoria_id)
);

CREATE TRIGGER insert_hospede AFTER INSERT 
ON hospede FOR EACH ROW
	INSERT INTO auditoria_hospede(operacao, data_operacao, id, id_pessoa, data_criacao_conta, ultimo_login)
VALUES ("I", now(), NEW.id, NEW.id_pessoa, NEW.data_criacao_conta, NEW.ultimo_login);

CREATE TRIGGER update_hospede AFTER UPDATE
ON hospede FOR EACH ROW
	INSERT INTO auditoria_hospede(operacao, data_operacao, id, id_pessoa, data_criacao_conta, ultimo_login)
VALUES 	("UA", now(), OLD.id, OLD.id_pessoa, OLD.data_criacao_conta, OLD.ultimo_login),
		("UZ", now(), NEW.id, NEW.id_pessoa, NEW.data_criacao_conta, NEW.ultimo_login);
        
CREATE TRIGGER delete_hospede AFTER DELETE
ON hospede FOR EACH ROW
	INSERT INTO auditoria_hospede(operacao, data_operacao, id, id_pessoa, data_criacao_conta, ultimo_login)
VALUES 	("D", now(), OLD.id, OLD.id_pessoa, OLD.data_criacao_conta, OLD.ultimo_login);


CREATE TABLE IF NOT EXISTS auditoria_acomodacao (
	auditoria_id INT AUTO_INCREMENT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao TIMESTAMP NOT NULL,
	id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    numero_camas INT NOT NULL,
    descricao_comodidades TEXT NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    disponibilidade BOOLEAN NOT NULL,
    PRIMARY KEY(auditoria_id)
);  

CREATE TRIGGER insert_acomodacao AFTER INSERT
ON acomodacao FOR EACH ROW
	INSERT INTO auditoria_acomodacao(operacao, data_operacao, id, nome, capacidade, numero_camas, descricao_comodidades, valor_diaria, disponibilidade)
VALUES ("I", now(), NEW.id, NEW.nome, NEW.capacidade, NEW.numero_camas, NEW.descricao_comodidades, NEW.valor_diaria, NEW.disponibilidade);

CREATE TRIGGER update_acomodacao AFTER UPDATE
ON acomodacao FOR EACH ROW
	INSERT INTO auditoria_acomodacao(operacao, data_operacao, id, nome, capacidade, numero_camas, descricao_comodidades, valor_diaria, disponibilidade)
VALUES 	("UA", now(), OLD.id, OLD.nome, OLD.capacidade, OLD.numero_camas, OLD.descricao_comodidades, OLD.valor_diaria, OLD.disponibilidade),
		("UZ", now(), NEW.id, NEW.nome, NEW.capacidade, NEW.numero_camas, NEW.descricao_comodidades, NEW.valor_diaria, NEW.disponibilidade);
	
CREATE TRIGGER delete_acomodacao AFTER DELETE
ON acomodacao FOR EACH ROW
	INSERT INTO auditoria_acomodacao(operacao, data_operacao, id, nome, capacidade, numero_camas, descricao_comodidades, valor_diaria, disponibilidade)
VALUES 	("D", now(), OLD.id, OLD.nome, OLD.capacidade, OLD.numero_camas, OLD.descricao_comodidades, OLD.valor_diaria, OLD.disponibilidade);


CREATE TABLE IF NOT EXISTS auditoria_reserva (
	auditoria_id INT AUTO_INCREMENT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao TIMESTAMP NOT NULL,
	id INT NOT NULL,
    id_hospede INT NOT NULL,
    id_acomodacao INT NOT NULL,
    id_funcionario INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    valor DECIMAL(10,2),
    metodo_pgto VARCHAR(255) NOT NULL,
    status_reserva BOOLEAN NOT NULL,
    preferencias VARCHAR(255) NOT NULL,
    PRIMARY KEY(auditoria_id)
);

CREATE TRIGGER insert_reserva AFTER INSERT
ON reserva FOR EACH ROW
	INSERT INTO auditoria_reserva(operacao, data_operacao, id, id_hospede, id_acomodacao, id_funcionario, data_inicio, data_fim, valor, metodo_pgto, status_reserva, preferencias)
VALUES ("I", now(), NEW.id, NEW.id_hospede, NEW.id_acomodacao, NEW.id_funcionario, NEW.data_inicio, NEW.data_fim, NEW.valor, NEW.metodo_pgto, NEW.status_reserva, NEW.preferencias);

CREATE TRIGGER update_reserva AFTER UPDATE
ON reserva FOR EACH ROW
	INSERT INTO auditoria_reserva(operacao, data_operacao, id, id_hospede, id_acomodacao, id_funcionario, data_inicio, data_fim, valor, metodo_pgto, status_reserva, preferencias)
VALUES 	("UA", now(), OLD.id, OLD.id_hospede, OLD.id_acomodacao, OLD.id_funcionario, OLD.data_inicio, OLD.data_fim, OLD.valor, OLD.metodo_pgto, OLD.status_reserva, OLD.preferencias),
		("UZ", now(), NEW.id, NEW.id_hospede, NEW.id_acomodacao, NEW.id_funcionario, NEW.data_inicio, NEW.data_fim, NEW.valor, NEW.metodo_pgto, NEW.status_reserva, NEW.preferencias);
        
CREATE TRIGGER delete_reserva AFTER DELETE
ON reserva FOR EACH ROW
	INSERT INTO auditoria_reserva(operacao, data_operacao, id, id_hospede, id_acomodacao, id_funcionario, data_inicio, data_fim, valor, metodo_pgto, status_reserva, preferencias)
VALUES 	("D", now(), OLD.id, OLD.id_hospede, OLD.id_acomodacao, OLD.id_funcionario, OLD.data_inicio, OLD.data_fim, OLD.valor, OLD.metodo_pgto, OLD.status_reserva, OLD.preferencias);


-- FIM DO SCRIPT
