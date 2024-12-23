import Styles from "./Read.module.css"
import Delete from "./Delete"

const Read = ({ columns, data, endPointRead, endPointDelete }) => {

  // Leer desde acá

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
                <Delete endPointDelete={endPointDelete} id={row.id} />
              </td>
              <td className={Styles.TableCell}>Actualizar</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Read
