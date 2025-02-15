const User = require('../Models/User')

const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const newUser = await User.create({ name, email, password })
    res.status(201).json({ newUser, 'Entrega': true })
  } 
  catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const GetUsers = async (req, res) => {
  try {
    const Users = await User.findAll({ raw: true })
    res.status(200).json([ ...Users, {'Entrega': true} ])
  } 
  catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
      userFinal = user.toJSON()
      userFinal.Entrega = true
      res.status(200).json(userFinal)
    }
    else {
      res.status(404).json({ error: 'User not found', 'Entrega': false })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.messagem, 'Entrega': false })
  }
}

const GetUserByName = async (req, res) => {
  try {
    const { name } = req.params    
    const user = await User.findOne({ where: { name } })
    if (user) {
      userFinal = user.toJSON()
      userFinal.Entrega = true
      res.status(200).json(userFinal)
    } 
    else {
      res.status(404).json({ error: 'User not found', 'Entrega': false })
    }
  } 
  catch (error) {   
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body
    const user = await User.findByPk(id)
    if (user) {
      user.name = name
      user.email = email
      user.password = password
      await user.save()
      res.status(200).json({ user, 'Entrega': true })
    }
    else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      res.status(200).json({ message: 'Usuario eliminado', 'Entrega': true })
    } 
    else {
      res.status(404).json({ error: 'User not found', 'Entrega': false })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message, 'Entrega': false })
  }
}

module.exports = { CreateUser, GetUsers, GetUserById, GetUserByName, UpdateUser, DeleteUser }
