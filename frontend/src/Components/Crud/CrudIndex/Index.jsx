import Read from "./Read"

const Index = ({ columns, endPoints }) => {
  
  const { endPointDelete, endPointRead, endPointUpdate } = endPoints

  return (
    <div>
      <Read columns={columns} endPointUpdate={endPointUpdate} endPointRead={endPointRead} endPointDelete={endPointDelete} />
    </div>
  )
}

export default Index
