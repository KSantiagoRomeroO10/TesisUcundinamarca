const User = require('../models/User')

const CreateUser = async (req, res) => {
  try {
    const { name, password } = req.body
    const newUser = await User.create({ name, password })
    res.status(201).json(newUser)
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetUsers = async (req, res) => {
  try {
    const Users = await User.findAll()
    res.status(200).json(Users)
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
      res.status(200).json(user)
    }
    else {
      res.status(404).json({ error: 'User not found' })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const GetUserByName = async (req, res) => {
  try {
    const { name } = req.params
    const user = await User.findOne({ where: { name } })
    
    if (user) {
      res.status(200).json(user)
    } 
    else {
      res.status(404).json({ error: 'User not found' })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, password } = req.body
    const user = await User.findByPk(id)
    if (user) {
      user.name = name
      user.password = password
      await user.save()
      res.status(200).json(user)
    }
    else {
      res.status(404).json({ error: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const DeleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (user) {
      await user.destroy()
      res.status(200).json({ message: 'Usuario eliminado' })
    } 
    else {
      res.status(404).json({ error: 'User not found' })
    }
  } 
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { CreateUser, GetUsers, GetUserById, GetUserByName, UpdateUser, DeleteUser }
