import Read from "./Read"
import Create from "./Create"
import { useState } from "react"

const Index = ({ columns, endPoints }) => {

  const [data, setData] = useState([])
  
  const { endPointDelete, endPointRead, endPointUpdate, endPointNew } = endPoints
  
  return (
    <div>
      <Create data={data} setData={setData} columns={columns} endPointNew={endPointNew}/>
      <Read data={data} setData={setData} columns={columns} endPointUpdate={endPointUpdate} endPointRead={endPointRead} endPointDelete={endPointDelete} />
    </div>
  )
}

export default Index
