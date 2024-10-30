const Evaluation = require('../Models/Evaluation')

const CreateEvaluation = async (req, res) => {
  try {
    const { traduccion, software } = req.body
    const newEvaluation = await Evaluation.create({ traduccion, software })
    res.status(201).json({newEvaluation})
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll()
    res.status(200).json(evaluations)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetEvaluationById = async (req, res) => {
  try {
    const { id } = req.params
    const evaluation = await Evaluation.findByPk(id)
    if (evaluation) {
      res.status(200).json(evaluation)
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const UpdateEvaluation = async (req, res) => {
  try {
    const { id } = req.params
    const { evaluation } = req.body
    const existingEvaluation = await Evaluation.findByPk(id)
    if (existingEvaluation) {
      existingEvaluation.evaluation = evaluation
      await existingEvaluation.save()
      res.status(200).json(existingEvaluation)
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params
    const evaluation = await Evaluation.findByPk(id)
    if (evaluation) {
      await evaluation.destroy()
      res.status(200).json({ message: 'Evaluación eliminada' })
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada' })
    }
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { CreateEvaluation, GetEvaluations, GetEvaluationById, UpdateEvaluation, DeleteEvaluation }
