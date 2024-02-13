const CARGOS_LIST = {
    "Usuario": process.env.REACT_APP_ID_USUARIO,
    "Recepcionista": process.env.REACT_APP_ID_RECEPCIONISTA,
    "Admin": process.env.REACT_APP_ID_ADM,
    "Gerente_Admin": process.env.REACT_APP_ID_GERENTE_ADM,
    "Enfermeiro": process.env.REACT_APP_ID_ENFERMEIRO,
    "Medico": process.env.REACT_APP_ID_MEDICO,
    "TI": process.env.REACT_APP_ID_TI,
    "Superuser": process.env.REACT_APP_ID_SUPERUSER
}

module.exports = CARGOS_LIST