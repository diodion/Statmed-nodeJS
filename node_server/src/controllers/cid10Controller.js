const CID10 = require("../models/CID10")

// /cid10
const getCID10 = async (req, res) => {
    try {
        const results = await CID10.findAll({limit: 200})
        const data = results.map(result => result.dataValues)
        res.json(data)
    } catch (error) {
        console.error("\nError /cid10: ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = { getCID10 }
