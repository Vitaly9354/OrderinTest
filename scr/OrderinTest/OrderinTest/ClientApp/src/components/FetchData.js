import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true, simpleData: [] };
  }

  componentDidMount() {
      this.populateWeatherData();
      this.populateSimpleData();
    }

    static renderSimpleData(simpleData) {
        return (
            <ul>
                {simpleData.map(item =>
                    <li key={item.id}>{item.name}, {item.city}, {item.suburb }</li>)}
            </ul>
        );
	}

  static renderForecastsTable(forecasts) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
          : FetchData.renderForecastsTable(this.state.forecasts);

      let simpleDataContent = this.state.simpleDataLoading
          ? <p><em>Loading Simple Data...</em></p>
          : FetchData.renderSimpleData(this.state.simpleData);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server 123.</p>
            {contents}

            {simpleDataContent}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
    }

   async populateSimpleData() {
       const response = await fetch('simpledata');
       const data = await response.json();
       this.setState({ simpleData: data });
   }
}
