import Styles from './Instructions.module.css'

const Instructions = () => { 

    return(
      <div className={Styles.InstructionsContainer}>
        <div className={Styles.Emoji1}>🚀</div>
        <div className={Styles.Emoji2}>🎨</div>
        <div className={Styles.Emoji3}>🦕</div>
        <div className={Styles.Emoji4}>🎁</div>
        <h1 className={Styles.Title}>¡Aprende y diviértete con el traductor de señas!</h1>
        <br />
        <ul className={Styles.Instructions}>
          <li>
            Habla para traducir

            Busca el micrófono en la pantalla (es un dibujito de un micrófono).

            Haz clic en él y di algo en voz alta, como "Hola" o "Gracias".

            ¡Mira! Aparecerá un personaje que te mostrará cómo se dice eso en lenguaje de señas colombiano.
          </li>
          <br />
          <li>
            Practica las señas

            Observa con atención cómo el personaje hace las señas.

            Intenta copiar los movimientos con tus manos. ¡Puedes practicar varias veces!
          </li>
          <br />
          <li>
            Pide ayuda si la necesitas

            Si no entiendes algo o necesitas ayuda, llama a un adulto. Ellos están para ayudarte.
          </li>
        </ul>
      </div>
    )

}

export default Instructions