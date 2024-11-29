import mysql from 'mysql2'
import dotenv from 'dotenv'
import Joi from 'joi'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function insert_hospede_e_pessoa(pessoaData, hospedeData) {
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        // Inserir pessoa
        const [pessoaResult] = await connection.query(
            'INSERT INTO pessoa (nome, cpf, login, senha, data_nasc, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [pessoaData.nome, pessoaData.cpf, pessoaData.login, pessoaData.senha, pessoaData.data_nasc, pessoaData.telefone, pessoaData.email]
        );

        // Inserir hóspede
        const pesosaId = pessoaResult.insertId;
        await connection.query(
            'INSERT INTO hospede(id_pessoa, data_criacao_conta, ultimo_login) VALUES (?, ?, ?);',
            [pessoaResult.insertId, hospedeData.data_criacao_conta, hospedeData.ultimo_login]
            
        );
    
        await connection.commit();
        return pessoaId;
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao inserir pessoa e hospéde:", error);
        throw error;
    } finally {
        connection.release();
    }
}


export async function insert_funcionario_e_pessoa(pessoaData, funcionarioData) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction(); // Inicia a transação

        // Inserir pessoa
        const [pessoaResult] = await connection.query(
            'INSERT INTO pessoa (nome, cpf, login, senha, data_nasc, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [pessoaData.nome, pessoaData.cpf, pessoaData.login, pessoaData.senha, pessoaData.data_nasc, pessoaData.telefone, pessoaData.email]
        );

        // Inserir funcionário
        const pessoaId = pessoaResult.insertId;
        await connection.query(
            'INSERT INTO funcionario (id_pessoa, cargo, salario, data_admissao) VALUES (?, ?, ?, ?)',
            [pessoaId, funcionarioData.cargo, funcionarioData.salario, funcionarioData.data_admissao]
        );

        await connection.commit(); // Confirma a transação
        return pessoaId; // Retorna o ID da pessoa inserida
    } catch (error) {
        await connection.rollback(); // Reverte as operações em caso de erro
        console.error("Erro ao inserir pessoa e funcionário:", error);
        throw error;
    } finally {
        connection.release(); // Libera a conexão
    }
}


export async function insert_acomodacao()
