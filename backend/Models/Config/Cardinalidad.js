const sequelize = require('./Connect')

// Importaciones de modelos
const Audio = require('../Audio')
const Evaluation = require('../Evaluation')
const Keyword = require('../Keyword')
const TextAudio = require('../TextAudio')
const User = require('../User')
const Video = require('../Video')

// Relación uno a uno: Un Audio tiene un TextAudio asociado
Audio.hasOne(TextAudio, {
  foreignKey: 'IdAudio', // La clave externa en TextAudio que hace referencia a Audio
  onDelete: 'CASCADE',   // Si se elimina un Audio, también se eliminará su TextAudio asociado
  onUpdate: 'CASCADE'    // Si se actualiza la clave primaria de Audio, se actualizará automáticamente en TextAudio
})

// Relación inversa: Un TextAudio pertenece a un Audio
TextAudio.belongsTo(Audio, {
  foreignKey: 'IdAudio' // La clave externa en TextAudio que hace referencia a Audio
})

// Relación muchos a muchos: Un TextAudio puede tener muchas Keywords y una Keyword puede estar asociada a muchos TextAudio
TextAudio.belongsToMany(Keyword, {
  through: 'Text_Audio_Keyword', // Nombre de la tabla intermedia
  foreignKey: 'IdTextAudio',      // Clave externa en la tabla intermedia que hace referencia a TextAudio
  onDelete: 'CASCADE',            // Si se elimina un TextAudio, también se eliminarán todas las relaciones en la tabla intermedia
  onUpdate: 'CASCADE',            // Si se actualiza la clave primaria de TextAudio, se actualizará automáticamente en la tabla intermedia
  otherKey: 'IdKeyword'           // Clave externa en la tabla intermedia que hace referencia a Keyword
})

// Relación inversa: Una Keyword puede estar asociada a muchos TextAudio
Keyword.belongsToMany(TextAudio, {
  through: 'Text_Audio_Keyword', // Nombre de la tabla intermedia
  foreignKey: 'IdKeyword',        // Clave externa en la tabla intermedia que hace referencia a Keyword
  onDelete: 'CASCADE',            // Si se elimina una Keyword, también se eliminarán todas las relaciones en la tabla intermedia
  onUpdate: 'CASCADE',            // Si se actualiza la clave primaria de Keyword, se actualizará automáticamente en la tabla intermedia
  otherKey: 'IdTextAudio'         // Clave externa en la tabla intermedia que hace referencia a TextAudio
})

// Relación uno a uno: Un Video tiene una Keyword asociada
Video.hasOne(Keyword, {
  foreignKey: 'IdVideo', // La clave externa en Keyword que hace referencia a Video
  onDelete: 'CASCADE',   // Si se elimina un Video, también se eliminará su Keyword asociada
  onUpdate: 'CASCADE'    // Si se actualiza la clave primaria de Video, se actualizará automáticamente en Keyword
})

// Relación inversa: Una Keyword pertenece a un Video
Keyword.belongsTo(Video, {
  foreignKey: 'IdVideo', // La clave externa en Keyword que hace referencia a Video
  onDelete: 'CASCADE',   // Si se elimina un Keyword, también se actualizará su relación en Video
  onUpdate: 'CASCADE'    // Si se actualiza la clave primaria de Keyword, se actualizará automáticamente en Video
})

module.exports = sequelize
