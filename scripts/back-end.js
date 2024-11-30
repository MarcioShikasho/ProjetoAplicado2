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

export async function validarLogin(login, senha) {
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        const [loginResult] = await connection.query(
            'SELECT * FROM pessoa WHERE login = ? AND senha = ?;',
            [login, senha]
        );
    if (loginResult.length > 0) {
        await connection.query(
            'UPDATE hospede SET ultimo_login = CURDATE() WHERE id_pessoa = ?;',
            [loginResult[0]]
        );
        console.log("Ultimo login atualizado!")
        localStorage.setItem('userId', loginResult[0]);

        await connection.commit();

        return loginResult[0];
    } else {
        console.log("Usuário ou senha inválidos");
        await connection.rollback();
        return null;
    }} catch (error) {
        console.error("Erro durante o login: ", error)

        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export async function insertHospedePessoa(pessoaData, hospedeData) {
    const connection = await pool.getConnection();
    try{
        await connection.beginTransaction();

        const [pessoaResult] = await connection.query(
            'INSERT INTO pessoa (nome, cpf, senha, data_nasc, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [pessoaData.nome, pessoaData.cpf, pessoaData.senha, pessoaData.data_nasc, pessoaData.telefone, pessoaData.email]
        );

        const pessoaId = pessoaResult.insertId;
        await connection.query(
            'INSERT INTO hospede(id_pessoa, data_criacao_conta, ultimo_login) VALUES (?, CURDATE(), CURDATE());',
            [pessoaResult.insertId]
            
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
 

// export async function select_hospede(id) {
//     const connection = await pool.getConnection();
//     try {
//         await connection.beginTransaction();
//         const [selectResult] = await connection.query(
//             'SELECT * FROM pessoa WHERE id = ?;', id
//         );
//         if (selectResult.length === 0) {
//             return null;
//         }

//         return selectResult;
//     } catch (error) {
//         console.error("Erro ao buscar dados", error);
//         throw err
//     }
// }


// export async function insertFuncionarioPessoa(pessoaData, funcionarioData) {

//     const connection = await pool.getConnection();
//     try{
//         await connection.beginTransaction();

//         const [pessoaResult] = await connection.query(
//             'INSERT INTO pessoa (nome, cpf, senha, data_nasc, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
//             [pessoaData.nome, pessoaData.cpf, pessoaData.senha, pessoaData.data_nasc, pessoaData.telefone, pessoaData.email]
//         );

//         const pessoaId = pessoaResult.insertId;
//         await connection.query(
//             'INSERT INTO funcionario (id_pessoa, cargo, salario, data_admissao) VALUES (?, ?, ?, ?)',
//             [pessoaId, funcionarioData.cargo, funcionarioData.salario, funcionarioData.data_admissao]
//         );

//         await connection.commit();
//         return pessoaId; 
//     } catch (error) {
//         await connection.rollback(); // Reverte as operações em caso de erro
//         console.error("Erro ao inserir pessoa e funcionário:", error);
//         throw error;
//     } finally {
//         connection.release(); // Libera a conexão
//     }
// }


export async function insertAcomodacao(acomodacaoData) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [acomodacaoResult] = await connection.query(
            'INSERT INTO acomodacao(nome, capacidade, numero_camas, descricao_acomodidades, valor_diario, disponibilidade',
            [nome, capacidade, numero_camas, descricao_acomodidades, valor_diaria, disponibilidade]
        );

        await connection.commit();
        return acomodacaoResult.insertId;
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao inserir acomodação", error);
        throw error;
    } finally {
        connection.release();
    }
}

export async function insertReserva(reservaData) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [reservaResult] = await connection.query(
            'INSERT INTO reserva(id_hospede, id_acomodacao, id_funcionario, data_inicio, data_fim, valor, metodo_pgto, status_reserva, preferencias) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [nome, capacidade, numero_camas, descricao_acomodidades, valor_diaria, disponibilidade]
        );

        await connection.commit();
        return reservaResult.insertId;
    } catch (error) {
        await connection.rollback();
        console.error("Erro ao inserir reserva", error);
        throw error;
    } finally {
        connection.release();
    }
}
