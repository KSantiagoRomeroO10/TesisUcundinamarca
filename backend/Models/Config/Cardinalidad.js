const sequelize = require('./Connect')

const Audio = require('../Audio')
const Evaluation = require('../Evaluation')
const Keyword = require('../Keyword')
const User = require('../User')
const Video = require('../Video')
const WordRecomended = require('../WordRecomended')

Video.hasOne(Keyword, {
  foreignKey: {
    name: 'IdVideoFK',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
})

Keyword.belongsTo(Video, {
  foreignKey: {
    name: 'IdVideoFK',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
})

User.hasMany(Evaluation, {
  foreignKey: {
    name: 'idUserFKEvaluation',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

Evaluation.belongsTo(User, {
  foreignKey: {
    name: 'idUserFKEvaluation',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

User.hasMany(WordRecomended, {
  foreignKey: {
    name: 'idUserFKWR',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

WordRecomended.belongsTo(User, {
  foreignKey: {
    name: 'idUserFKWR',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

User.hasMany(Keyword, {
  foreignKey: {
    name: 'idUserFKKW',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

Keyword.belongsTo(User, {
  foreignKey: {
    name: 'idUserFKKW',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

User.hasMany(Video, {
  foreignKey: {
    name: 'idUserFKVideo',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

Video.belongsTo(User, {
  foreignKey: {
    name: 'idUserFKVideo',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

User.hasMany(Audio, {
  foreignKey: {
    name: 'idUserFKAudio',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

Audio.belongsTo(User, {
  foreignKey: {
    name: 'idUserFKAudio',
    allowNull: true,
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL'
  }
})

module.exports = sequelize
