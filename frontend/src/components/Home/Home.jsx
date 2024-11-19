import Styles from './Home.module.css'

import { useState, useEffect } from "react"

import Microphone from './Components/Microphone/Microphone'
import Video from './Components/Video/Video'

const Home = () => { 

  const [notes, setNotes] = useState(null)

  useEffect(() => {
    console.log(notes)    
  }, [notes])

  return(
    <div className={Styles.Container}>
      <div className={Styles.Microphone}>
        <Microphone notes={notes} setNotes={setNotes}/>
      </div>
      <div className={Styles.Video}>
        <Video notes={notes}/>
      </div>
    </div>
  )
}

export default Home
