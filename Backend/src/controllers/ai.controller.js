const aiservice = require("../services/ai.service")

module.exports.getReview = async (req, res) => {
    const prompt = req.body.prompt

    if (!prompt) {
        return res.status(400).send("Prompt is required")
    }

    const response = await aiservice(prompt)
    res.send(response)
}