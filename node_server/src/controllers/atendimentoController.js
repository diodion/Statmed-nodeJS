const sequelize = require('../database/connection').sequelize
const Paciente = require('../models/Paciente')
const Atendimento = require('../models/Atendimento')

const getAllAtendimento = async (req, res) => {
    try {
        const results = await Atendimento.findAll({
            attributes: [
                'idAtendimento',
                'cid',
                'epidemia',
                [
                    sequelize.fn(
                        'DATE_FORMAT',
                        sequelize.col('data'),
                        '%d/%m/%Y',
                    ),
                    'data',
                ],
            ],
            include: [
                {
                    model: Paciente,
                    attributes: [
                        'idSame',
                        'Nome',
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('DataNasc'),
                                '%d/%m/%Y',
                            ),
                            'DataNasc',
                        ],
                        'CPF',
                    ],
                },
            ],
        })
        const data = results.map(result => result.dataValues)
        console.log(data)
        res.json(data)
    } catch (error) {
        console.error('\nError /histatendimento:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}

const getAtendimentoById = async (req, res) => {
    const { id } = req.params

    try {
        const atendimento = await Atendimento.findByPk(id, {
            include: [
                {
                    model: Paciente,
                    attributes: [
                        'idSame',
                        'nome',
                        [
                            sequelize.fn(
                                'DATE_FORMAT',
                                sequelize.col('dataNasc'),
                                '%d/%m/%Y',
                            ),
                            'dataNasc',
                        ],
                        'cpf',
                    ],
                },
            ],
        })

        if (!atendimento) {
            return res
                .status(404)
                .json({ message: `Atendimento ID ${id} not found` })
        }

        return res.json(atendimento)
    } catch (error) {
        console.error('Error /@getAtendimentoById:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const createAtendimento = async (req, res) => {
    try {
        const newAtendimento = await Atendimento.create(req.body)
        return res.json(newAtendimento)
    } catch (error) {
        console.error('Error /@createAtendimento:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const updateAtendimento = async (req, res) => {
    const { id } = req.params

    try {
        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            return res
                .status(404)
                .json({ message: `Atendimento ID ${id} not found` })
        } 

        await atendimento.update(req.body)

        return res.json({ success: true, data: atendimento })
    } catch (error) {
        console.error('Error /@updateAtendimento:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const deleteAtendimento = async (req, res) => {
    const { id } = req.params

    try {
        const atendimento = await Atendimento.findByPk(id)

        if (!atendimento) {
            return res
                .status(404)
                .json({ message: `Atendimento ID ${id} not found` })
        }

        await atendimento.destroy()
        return res.json({
            message: `Atendimento ID ${id} deleted successfully!`,
        })
    } catch (error) {
        console.error('Error /@deleteAtendimento:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const updateAnamnese = async (req, res) => {
    const { idAtendimento } = req.body

    try {
        const atendimento = await Atendimento.findByPk(idAtendimento)

        if (!atendimento) {
            return res
                .status(404)
                .json({ message: `Atendimento ID ${idAtendimento} not found` })
        }

        await atendimento.update(req.body)

        return res.json({ success: true, data: atendimento })
    } catch (error) {
        console.error('Error /@updateAtendimento:', error)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

const updateAtestado = async (req, res) => {
    const { idAtendimento } = req.body

    try {
        const atendimento = await Atendimento.findByPk(idAtendimento);

        if (!atendimento) {
            return res.status(404).json({ message: `Atendimento ID ${idAtendimento} not found` });
        }

        await atendimento.update(req.body)

        return res.json({ success: true, data: atendimento });
    } catch (error) {
        console.error('Error /@updateatestado:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateRelatorio = async (req, res) => {
    const { idAtendimento } = req.body;

    try {
        const atendimento = await Atendimento.findByPk(idAtendimento);

        if (!atendimento) {
            return res.status(404).json({ message: `Atendimento ID ${idAtendimento} not found` });
        }

        await atendimento.update(req.body);

        return res.json({ success: true, data: atendimento });
    } catch (error) {
        console.error('Error /@updaterelatorio:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateReceita = async (req, res) => {
    const { idAtendimento } = req.body;

    try {
        const atendimento = await Atendimento.findByPk(idAtendimento);

        if (!atendimento) {
            return res.status(404).json({ message: `Atendimento ID ${idAtendimento} not found` });
        }

        await atendimento.update(req.body);

        return res.json({ success: true, data: atendimento });
    } catch (error) {
        console.error('Error /@updatereceita:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const updateEncaminhamento = async (req, res) => {
    const { idAtendimento } = req.body;

    try {
        const atendimento = await Atendimento.findByPk(idAtendimento);

        if (!atendimento) {
            return res.status(404).json({ message: `Atendimento ID ${idAtendimento} not found` });
        }

        await atendimento.update(req.body);

        return res.json({ success: true, data: atendimento });
    } catch (error) {
        console.error('Error /@updateencaminhamento:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllAtendimento,
    getAtendimentoById,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento,
    updateAnamnese,
    updateAtestado,
    updateRelatorio,
    updateReceita,
    updateEncaminhamento,
}


