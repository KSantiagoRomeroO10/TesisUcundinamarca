const Evaluation = require('../Models/Evaluation')

const CreateEvaluation = async (req, res) => {
  try {
    const { traduccion, software } = req.body
    const newEvaluation = await Evaluation.create({ traduccion, software })
    const evaluationFinal = newEvaluation.toJSON()
    evaluationFinal.Entrega = true
    res.status(201).json(evaluationFinal)
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

const GetEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll({ raw: true })
    res.status(200).json([ ...evaluations, { 'Entrega': true }])
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

const GetEvaluationsPromedio = async (req, res) => {
  try {
    // Obtiene todas las evaluaciones desde la base de datos
    const evaluations = await Evaluation.findAll()

    // Si no hay evaluaciones, responde con un mensaje adecuado
    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({ message: 'No hay evaluaciones disponibles', 'Entrega': false })
    }

    // Calcula los promedios de traduccion y software
    let totalTraduccion = 0
    let totalSoftware = 0
    let count = 0

    // Itera sobre las evaluaciones y suma los valores de traduccion y software
    evaluations.forEach((item) => {
      if (item.traduccion !== null && item.software !== null) {
        totalTraduccion += item.traduccion
        totalSoftware += item.software
        count++
      }
    })

    // Calcula los promedios si hay evaluaciones
    const promedioTraduccion = totalTraduccion / count
    const promedioSoftware = totalSoftware / count

    // Construye el objeto con los promedios
    const result = {
      traduccion: promedioTraduccion,
      software: promedioSoftware,
      'Entrega': true
    }

    // Devuelve los promedios en la respuesta
    return res.status(200).json(result)
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

const GetEvaluationById = async (req, res) => {
  try {
    const { id } = req.params
    const evaluation = await Evaluation.findByPk(id)
    if (evaluation) {
      evaluationFinal = evaluation.toJSON()
      evaluationFinal.Entrega = true
      res.status(200).json(evaluationFinal)
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada', 'Entrega': false })
    }
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

const UpdateEvaluation = async (req, res) => {
  try {
    const { id } = req.params
    const { traduccion, software } = req.body
    const existingEvaluation = await Evaluation.findByPk(id)
    if (existingEvaluation) {
      existingEvaluation.traduccion = traduccion
      existingEvaluation.software = software
      await existingEvaluation.save()
      const updatedEvaluation = existingEvaluation.toJSON()
      updatedEvaluation.Entrega = true
      res.status(200).json(updatedEvaluation)
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada', 'Entrega': false })
    }
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

const DeleteEvaluation = async (req, res) => {
  try {
    const { id } = req.params
    const evaluation = await Evaluation.findByPk(id)
    if (evaluation) {
      await evaluation.destroy()
      res.status(200).json({ message: 'Evaluación eliminada', 'Entrega': true })
    }
    else {
      res.status(404).json({ error: 'Evaluación no encontrada', 'Entrega': false })
    }
  }
  catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      details: error.message,
      'Entrega': false
    })
  }
}

module.exports = { CreateEvaluation, GetEvaluations, GetEvaluationsPromedio, GetEvaluationById, UpdateEvaluation, DeleteEvaluation }