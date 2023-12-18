import React from 'react'
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from "recharts";


  
const AreaCharts = ({data}) => {

  return (
    <ResponsiveContainer width="100%" height="40%">
        <AreaChart width={500} height={400} data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
  )
}



export default AreaCharts