const { DataTypes } = require('sequelize')
const sequelize = require('./Config/Connect')

const Video = sequelize.define('Video', {
  IdVideo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  Video: {
    type: DataTypes.BLOB,
    allowNull: false
  }
})

module.exports = Video
