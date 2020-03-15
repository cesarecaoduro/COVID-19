import React from 'react';
import axios from 'axios';
import {groupBy} from 'lodash';

import {readString} from 'react-papaparse';
import NationalData from './charts/NationalData';

export default class Covid extends React.Component{
    constructor(){
        super();
        this.state = {
            dailyReportsUrls: null,
            dailyItaly: null,
            dailyItalyByRegioni: null,
            dailyItalyByProvince: null,
            timeSeriesConfirmed: null,
            timeSeriesDeaths: null,
            timeSeriesRecovered: null,
        };
    };

    componentDidMount(){
        //this.getDailyReports();
        //this.getTimeSeries();
        this.getItaly();
        this.getItalyByRegioni();
        this.getItalyByProvince();
    }

    getItaly(){
        let vState = this;
        axios.get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json')
        .then(response => {
            vState.setState({dailyItaly : response.data});
        })
        .catch(err => console.log(err))
    }

    getItalyByRegioni(){
        let vState = this;
        axios.get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-regioni.json')
        .then(response => {
            
            let a = groupBy(response.data, function(item){return item.data});
            vState.setState({dailyItalyByRegioni : a[Object.keys(a)[Object.keys(a).length - 1]]});
        })
        .catch(err => console.log(err))
    }

    getItalyByProvince(){
        let vState = this;
        axios.get('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-province.json')
        .then(response => {
            
            let a = groupBy(response.data, function(item){return item.data});
            vState.setState({dailyItalyByProvince : a[Object.keys(a)[Object.keys(a).length - 1]]});
        })
        .catch(err => console.log(err))
    }

    getDailyReports(){
        let vState = this;
        if (this.state.dailyReportsUrls == null){
            axios.get('https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports/', {
                headers : {'Authorization' : 'token 3e8c545a58c6ff61d9607274e04119029306aeac'}
            })
            .then(response => {
                let downloadUrl = [];
                response.data.map(item => item.name.includes('csv') ? downloadUrl.push(item.download_url) : null);

                vState.setState({dailyReportsUrls : downloadUrl});
                console.log(response.data);
            })
            .catch(err => console.log(err))
        }
        
    }

    getTimeSeries(){
        let vState = this;
        axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv')
        .then(response => {
            vState.setState({timeSeriesConfirmed : readString(response.data)});
            console.log(response.data);
        })
        .catch(err => console.log(err))
        axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv')
        .then(response => {
            vState.setState({timeSeriesDeaths : readString(response.data)});
            console.log(response.data);
        })
        .catch(err => console.log(err))
        axios.get('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv')
        .then(response => {
            vState.setState({timeSeriesRecovered : readString(response.data)});
            console.log(response.data);
        })
        .catch(err => console.log(err))
    }

    render(){
        return (
            <>
            <NationalData data={this.state.dailyItaly}/>
            </>
        )
    }
}
