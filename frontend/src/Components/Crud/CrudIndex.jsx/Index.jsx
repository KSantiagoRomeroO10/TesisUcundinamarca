import Read from "./Read"

const Index = ({ columns, endPoints }) => {
  
  const { endPointDelete, endPointRead } = endPoints

  return (
    <div>
      <Read columns={columns} endPointRead={endPointRead} endPointDelete={endPointDelete} />
    </div>
  )
}

export default Index
