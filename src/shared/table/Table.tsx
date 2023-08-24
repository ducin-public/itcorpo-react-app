import './Table.css'

type TableProps = {
  headers: string[]
  rows: (string | React.ReactNode)[][]
}

export const Table = ({ headers, rows }: TableProps) =>
  <table id="customers">
    <thead>
      <tr>{headers.map(
        (header, idx) => <th key={idx}>{header}</th>
      )}</tr>
    </thead>

    <tbody>{rows.map(
      (row, rowIdx) => <tr key={rowIdx}>{row.map(
        (cell, cellIdx) => <td key={cellIdx}>{cell}</td>
      )}</tr>
    )}</tbody>
  </table>
