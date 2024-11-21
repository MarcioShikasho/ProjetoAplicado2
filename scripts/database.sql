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
	id INT AUTO_INCREMENT,
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
	id INT AUTO_INCREMENT,
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
	id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    numero_camas INT NOT NULL,
    descricao_comodidades TEXT NOT NULL,
    valor_diaria DECIMAL(10,2) NOT NULL,
    disponibilidade BOOLEAN NOT NULL,
    PRIMARY KEY(id)
);
    
CREATE TABLE IF NOT EXISTS reserva (
	id INT AUTO_INCREMENT,
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
CREATE USER 'programa'@'localhost' IDENTIFIED BY 'desabilitaSenha301'; 
GRANT select, insert, update, delete ON Pousada_Ypua.* TO 'programa'@'localhost';

-- AUDITORIAS


CREATE TABLE IF NOT EXISTS auditoria_pessoa (
	auditoria_id INT NOT NULL,
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
	INSERT INTO auditoria_funcionarios(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES ("I", now(), NEW.id, NEW.nome, NEW.cpf, NEW.login, NEW.senha, NEW.data_nasc, NEW.telefone, NEW.email)
;

CREATE TRIGGER update_pessoa AFTER UPDATE
ON pessoa FOR EACH ROW
	INSERT INTO auditoria_funcionarios(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES 	("UA", now(), OLD.id, OLD.nome, OLD.cpf, OLD.login, OLD.senha, OLD.data_nasc, OLD.telefone, OLD.email),
		("UZ", now(), NEW.id, NEW.nome, NEW.cpf, NEW.login, NEW.senha, NEW.data_nasc, NEW.telefone, NEW.email)
;

CREATE TRIGGER delete_pessoa AFTER DELETE
ON pessoa FOR EACH ROW
	INSERT INTO auditoria_funcionarios(operacao, data_operacao, id, nome, cpf, login, senha, data_nasc, telefone, email)
VALUES 	("D", now(), OLD.id, OLD.nome, OLD.cpf, OLD.login, OLD.senha, OLD.data_nasc, OLD.telefone, OLD.email)
;


CREATE TABLE IF NOT EXISTS auditoria_funcionario (
	auditoria_id INT AUTO_INCREMENT,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    data_operacao TIMESTAMP NOT NULL,
	id INT AUTO_INCREMENT,
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
	auditoria_id INT NOT NULL,
    operacao ENUM("I", "UA", "UZ", "D") NOT NULL,
    
    
