import Read from "./Read"

const Index = ({ columns, data, endPoints }) => {
  console.log(columns, data)
  
  const { endPointDelete, endPointRead } = endPoints

  return (
    <div>
      <Read columns={columns} data={data} endPointRead={endPointRead} endPointDelete={endPointDelete} />
    </div>
  )
}

export default Index
