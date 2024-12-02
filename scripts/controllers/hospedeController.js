const pool = require('../database');

exports.insertHospedePessoa = async (req, res) => {
    const pessoaData = req.body.pessoaData;
    const hospedeData = req.body.hospedeData;

    const connection = await pool.connection();

    try {
        await connection.beginTransaction();

        const [pessoaResult] = await connection.query(
            'INSERT INTO pessoa (nome, cpf, senha, data_nasc, telefone, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
            pessoaData.nome,
            pessoaData.cpf,
            pessoaData.senha,
            pessoaData.data_nasc,
            pessoaData.telefone,
            pessoaData.email
            ]
        );
        
        const pessoaId = pessoaResult.insertId;

        await connection.query(
            'INSERT INTO hospede(id_pessoa, data_criacao_conta, ultimo_login) VALUES (?, CURDATE(), CURDATE());',
            [pessoaId]
        );
        await connection.commit();
        res.status(201).json({ message: 'Hóspede cadastrado com sucesso!', id: pessoaId });
    } catch (error) {
        await connection.rollback();
        console.error('Erro ao inserir pessoa e hóspede:', error);
        res.status(500).json({ message: 'Erro ao cadastrar hóspede.' });
    } finally {
        connection.release();
    }
};


exports.validarLogin = async (req, res) => {
    const { email, senha } = req.body;
        
        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.'});
        }

        const connection = await pool.getConnection();

        try {
            const [rows] = await connection.query(
                'SELECT id, nome FROM pessoa WHERE email = ? AND senha = ?;',
                [email, senha]
            );

            if (rows.length === 0) {
                return res.status(401).json({ message: 'Email e senha estão incorretos!'})
            }

            const usuario = rows[0];

            await connection.query(
                'UPDATE hospede SET ultimo_login = CURDATE() WHERE id_pessoa = ?;',
                [usuario.id]
            );

            res.status(200).json({
                message: 'Login realizado com sucesso!',
                user: { id: usuario.id, nome: usuario.nome },
            });
        } catch (error) {
            console.error('Erro ao validar login:', error);
            res.status(500).json({ message: 'Erro ao realizar login. '});
        } finally {
            connection.release();
        }
};