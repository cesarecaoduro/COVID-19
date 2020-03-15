import React, {Component} from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

export default class NationalData extends Component{
    constructor(){
        super()
        this.setState = {}
    }

    componentDidMount(){}

    render(){
        return <>
        <div style={{width : '100%', height: '500px'}}>
        <ResponsiveContainer>
        <LineChart
            data={this.props.data}
            margin={{
            top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deceduti" stroke="#054A91" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="dimessi_guariti" stroke="#3E7CB1" />
            <Line type="monotone" dataKey="isolamento_domiciliare" stroke="#81A4CD" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="nuovi_attualmete_positivi" stroke="#F17300" />
            <Line type="monotone" dataKey="ricoverati_con_sintomi" stroke="#533A7B" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="tamponi" stroke="#4B244A" />
            <Line type="monotone" dataKey="terapia_intensiva" stroke="#25171A" />
            <Line type="monotone" dataKey="totale_attualmente_positivi" stroke="#575C55" />
            <Line type="monotone" dataKey="totale_casi" stroke="#6C7D47" />
            <Line type="monotone" dataKey="totale_ospedalizzati" stroke="#45425A" />

        </LineChart>
        </ResponsiveContainer>
        </div>
        </>
    }
}