/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react'
import './ReportContent.css'
import server from '../../services/server'
import Loading from '../Loading/Loading'

const ReportContent = () => {
  // eslint-disable-next-line no-unused-vars
  const userData = JSON.parse(localStorage.getItem('user-data'))
  const [keys, setKeys] = useState([])
  const title = localStorage.getItem('reportTitle')
  const reportId = localStorage.getItem('report')
  const reportParam = reportId === '4' ? `${reportId}/${userData.institucion_id}` : reportId
  const [content, setContent] = useState([])

  const fetchReport = async () => {
    const response = await fetch(`${server}/report/rep${reportParam}`)
    const json = await response.json()
    setContent(json.result)
    setKeys(Object.keys(json.result[0]))
  }

  const print = () => {
    document.getElementById('print').style.visibility = 'hidden'
    window.print()
    document.getElementById('print').style.visibility = 'visible'
  }

  useEffect(() => {
    fetchReport()
  }, [])

  if (content === undefined || content.length === 0) return (<Loading />)
  return (
    <div className="report" id="report">
      <h1>{title}</h1>
      <div className="headers" style={{ gridTemplateColumns: `repeat(${keys.length + 1}, 1fr)` }}>
        <h2>pagina</h2>
        {keys.map((key) => <h2>{key}</h2>)}
      </div>
      <div className="detail">
        {content.map((item, index) => (
          <div className="row" style={{ gridTemplateColumns: `repeat(${keys.length + 1}, 1fr)` }}>
            <p>{index + 1}</p>
            {
              Object.values(item).map((i) => <p>{i === false ? 'No' : i === true ? 'Si' : i}</p>)
            }
          </div>
        ))}
      </div>
      <button id="print" onClick={print} className="floatButton">🖶</button>
    </div>
  )
}

export default ReportContent
