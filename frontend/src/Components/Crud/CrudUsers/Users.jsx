import Styles from './Users.module.css'

import Index from '../CrudIndex.jsx/Index'
import { useState } from "react"

const IndexVideos = () => {

  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", age: 25 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 30 },
    { id: 3, name: "Alice Brown", email: "alice@example.com", age: 22 },
    { id: 4, name: "Bob White", email: "bob@example.com", age: 27 },
    { id: 5, name: "Charlie Black", email: "charlie@example.com", age: 35 },
    { id: 6, name: "Diana Gray", email: "diana@example.com", age: 29 },
    { id: 7, name: "Edward Blue", email: "edward@example.com", age: 33 },
    { id: 8, name: "Fiona Green", email: "fiona@example.com", age: 24 },
    { id: 9, name: "George Gold", email: "george@example.com", age: 28 },
    { id: 10, name: "Helen Silver", email: "helen@example.com", age: 31 },
    { id: 11, name: "John Doe", email: "john@example.com", age: 25 },
    { id: 12, name: "Jane Smith", email: "jane@example.com", age: 30 },
    { id: 13, name: "Alice Brown", email: "alice@example.com", age: 22 },
    { id: 14, name: "Bob White", email: "bob@example.com", age: 27 },
    { id: 15, name: "Charlie Black", email: "charlie@example.com", age: 35 },
    { id: 16, name: "Diana Gray", email: "diana@example.com", age: 29 },
    { id: 17, name: "Edward Blue", email: "edward@example.com", age: 33 },
    { id: 18, name: "Fiona Green", email: "fiona@example.com", age: 24 },
    { id: 19, name: "George Gold", email: "george@example.com", age: 28 },
    { id: 20, name: "Helen Silver", email: "helen@example.com", age: 31 }
  ])

  const columns = ["id", "name", "email", "age"]

  const endPoints = {
    endPointRead: 'http://localhost:3001/user/get',
    endPointDelete: 'http://localhost:3001/user/delete',
    endPointNew: 'http://localhost:3001/user/new'
  }
  
  return (
    <div>
      <br />
      <h1 className={Styles.Title}>CRUD de Videos</h1>
      <br />
      <Index columns={columns} data={data} setData={setData} endPoints={endPoints} />
    </div>
  )
}

export default IndexVideos
