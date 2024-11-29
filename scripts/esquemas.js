import Joi from "joi";

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf[9]) !== primeiroDigito) {
        return false;
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf[10]) !== segundoDigito) {
        return false
    }
    return true;
}



const pessoaValidacao = Joi.object({
    nome: Joi.string()
    .min(3)
    .max(255)
    .required()
    .messages({
        'string.min': 'É necessário digitar um nome completo',
        'string.max': 'O máximo de caracteres foi atingido',
        'any.required': 'O nome é obrigatório',
    }),

    cpf: Joi.string()
    .pattern(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
    .required()
    .custom((cpf, helpers) => {
        if (!validarCPF(cpf)) {
            return helpers.error('any.invalid');
        }
        return cpf;
    })
    .messages({
        'string.pattern.base': 'O CPF deve estar no formato 000.000.000-00 válido.',
        'any.invalid': 'O CPF fornecido é inválido.',
        'any.required': 'O CPF é obrigatório.',
    }),

    login: Joi.string()
    .min(3)
    .max(255)
    .required(),

    senha: Joi.string()
    .min(3)
    .max(255)
    .required(),

    data_nasc: Joi.date()
    .max('now')
    .required(),

    telefone: Joi.string()
    .length(15)
    .required(),

    email: Joi.string()
    .email()
    .required()

});

const hospedeValidacao = Joi.object({
    id_pessoa: Joi.integer()
    .required()
    .positive(),

    data_criacao_conta: Joi.date()
    .required(),

    ultimo_login: Joi.date()
    .required()
    
});

// const funcionarioValidacao = Joi.object({
//     id_pessoa: Joi.integer().required(),
//     cargo: Joi.string().min(3).max(255).required(),
//     salario: Joi.number().min(121)
// })

const acomodacaoValidacao = Joi.object({
    nome: Joi.string()
    .min(3)
    .max(100)
    .required(),

    capacidade: Joi.integer()
    .min(1)
    .max(6)
    .required(),

    numero_camas: Joi.integer()
    .min(1)
    .max(3)
    .required(),

    descricao_comodidades: Joi.string()
    .required(),

    valor_diaria: Joi.number()
    .positive
    .precision(2)
    .required(),

    disponibilidade: Joi.boolean()
    .required()

})

const reservaValidacao = Joi.object({
    id_hospede: Joi.integer()
    .required(),

    id_acomodacao: Joi.integer()
    .required(),

    id_funcionario: Joi.integer(),

    data_inicio: Joi.date()
    .min('now')
    .required(),

    data_fim: Joi.date()
    .greater(Joi.ref('data_inicio')).required(),

    valor: Joi.number()
    .positive
    .precision(2)
    .required(),

})