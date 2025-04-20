import Read from "./Read"
import Create from "./Create"
import { useState } from "react"
import Styles from "./Index.module.css"

const Index = ({ columns, endPoints }) => {

  const [data, setData] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [SuccessEliminate, setSuccessEliminate] = useState('')

  const { endPointDelete, endPointRead, endPointUpdate, endPointNew } = endPoints
  
  return (
    <div>
      {successMessage && <p className={Styles.Success}>{successMessage}</p>}
      {SuccessEliminate && <p className={Styles.Success}>{SuccessEliminate}</p>}

      <Create data={data} setData={setData} columns={columns} endPointNew={endPointNew}/>
      <Read data={data} setData={setData} columns={columns} endPointUpdate={endPointUpdate} endPointRead={endPointRead} endPointDelete={endPointDelete} setSuccessMessage={setSuccessMessage} setSuccessEliminate={setSuccessEliminate} />
    </div>
  )
}

export default Index
