// COPIA BACKUP DE TESTES
// COPIA BACKUP DE TESTES
// COPIA BACKUP DE TESTES
// COPIA BACKUP DE TESTES

const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt")

const createUsuario = async (req, res) => {
  try {
    const { nome, email, cpf, crm, usuario, data_nasc, id_cargo, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10)

    // Assuming the 'Usuario' model has been defined using Sequelize
    const newUsuario = await Usuario.create({
      nome,
      email,
      cpf,
      crm,
      usuario,
      data_nasc,
      id_cargo,
      senha_hash: hashedPassword,
    });

    return res.json(newUsuario);
    console.log("======= USUARIO REGISTRADO ======= \n", newUsuario)
  } catch (error) {
    if (error.name && error.parent.code == "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "CPF ou Email já existem." })
    }
    console.error("Error registering user:", error)
    console.log("!!!!!!!!! ERRO NO REGISTRO !!!!!!!!!!!!!")
    res.sendStatus(500)
  }
};

// Update an existing usuario
// TODO: Ver sobre reset de senha depois.
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.body;
    const usuario = await Usuario.findOne({ where: { id } });

    if (!usuario) {
      return res.status(404).json({ message: "!!! Usuario não encontrado" });
    }

    // Update the usuario properties
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    // Update other properties as needed...

    // Save the changes to the database
    await usuario.save();

    return res.json(usuario);
  } catch (error) {
    console.error("\nErro atualizando usuario: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params; // Assuming the user ID to delete is provided in the URL parameter
  
    try {
      // Check if the user exists
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
  
      // Delete the user
      await usuario.destroy();
  
      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      console.error("\nError deletandog usuario: ", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { createUsuario, updateUsuario, deleteUsuario };