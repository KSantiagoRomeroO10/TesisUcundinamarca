import Styles from "./Read.module.css"

import Delete from "./Delete"
import Update from "./Update"

import { useEffect, useState } from "react"

const Read = ({ columns, endPointUpdate, endPointRead, endPointDelete }) => {
  
  const [data, setData] = useState([])

  const ReadData = async() => {
    const response = await fetch(`${endPointRead}`, {
      method: 'GET'
    })
    const responseRead = await response.json()
    const filteredData = responseRead.map((item) => {
      const idKey = Object.keys(item).find((key) =>
        key.toLowerCase().includes("id")
      )
      const { [idKey]: id, ...rest } = item
      return {
        id,
        ...rest
      }
    })
    setData(filteredData)
  }

  useEffect(() => {
    ReadData()
  }, [])

  return (
    <div className={Styles.TableContainer}>
      <table className={Styles.CustomTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={Styles.TableHeader}>
                {column.toUpperCase()}
              </th>
            ))}
            <th colSpan={2} className={Styles.TableHeader}>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? Styles.TableRowEven : Styles.TableRowOdd}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className={Styles.TableCell}>
                  {row[column]}
                </td>
              ))}
              <td className={Styles.TableCell}>
                <Delete endPointDelete={endPointDelete} id={row.id} data={data} setData={setData} />
              </td>
              <td className={Styles.TableCell}>
                <Update endPointUpdate={endPointUpdate} columns={columns} id={row.id} data={data} setData={setData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Read