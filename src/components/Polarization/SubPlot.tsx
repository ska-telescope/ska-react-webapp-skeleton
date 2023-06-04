/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import Plot from 'react-plotly.js';

import { Grid } from "@mui/material";
import SignalCard  from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR, PROTOCOL } from '../../utils/constants';

const COLUMNS = 3;

interface SubPlotProps {
  polarization: string;
  resize: number;
  socketStatus: string; 
  data: any;
  legend: any;
}

const SubPlot = ({ polarization, resize, socketStatus, data, legend }: SubPlotProps) => {
  const { t } = useTranslation();

  const [showContent, setShowContent] = React.useState(false);
  const [chartData1, setChartData1] = React.useState(null);
  const [chartData2, setChartData2] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const cardTitle = () => {
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  function getBaseData(inData: any, polarisation: string, amplitude: boolean ) {
    const tmp = [];
    for (let i = 0; i < inData.length; i += 1) {
      if (inData[i].polarisation === polarisation) {
        tmp.push({ name: inData[i].baseline, data : amplitude ? inData[i].amplitudes : inData[i].phases });
      }
    }
    if (!legend) {
      return tmp;
    }

    const arr = [];
    for (let i = 0; i < tmp.length; i += 1) {
      if (tmp[i].name === legend[i].text && legend[i].active) {
        arr.push(tmp[i]);
      }
    }

    return arr;
  }

  function getLegendColor(name: string) { 
    if (legend) {
      for (let i = 0; i < legend.length; i++)
      {
        if (legend[i].text === name) {
          return legend[i].color;
        }
      }
    }
    return COLOR[0];  // Only here for completeness.
  }

  function getChartData(usedData: any, amplitude: boolean) {
    let chartData = [];
    if (!usedData.channels) {
      return chartData;
    }
    const baseData = getBaseData(usedData.data, polarization, amplitude);
    for (let i = 0; i < baseData.length; i++)
    {
      chartData.push(
        {
            x: usedData.channels,
            y: baseData[i].data,
            xaxis: (i) ? 'x' + i : 'x',
            yaxis: (i) ? 'y' + i : 'y',
            type: 'scatter',
            name: baseData[i].name,
            marker: {
              color: getLegendColor(baseData[i].name)
            }
        }
      );
    }
    return chartData;
  }

  const canShow = () => { 
    return data !== null;
  }

  const showToggle = () => { 
    setShowContent(showContent ? false : canShow());
  }

  React.useEffect(() => {
    if (data && data.data) {
      setChartData1(getChartData(data, true));
      setChartData2(getChartData(data, false));
    }
    setShowContent(canShow());
  }, [data, legend]);

  React.useEffect(() => {
    if (!refresh) 
      setShowContent(canShow());
    else
      setRefresh(false);
  }, [refresh]);

  React.useEffect(() => {
    if (showContent) {
      setShowContent(false);
      setRefresh(true);
    }
  }, [resize]);

  return (
    <SignalCard
      title={`SubPlot ${  polarization}`}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <Grid container direction="row" justifyContent="space-between">
        <Grid item md={6} xs={12}>
        {chartData1 && <Plot 
            data={chartData1} 
            layout = {{
                plot_bgcolor: darkMode ? "black" : "white",
                paper_bgcolor: darkMode ? "black" : "white",
                showlegend: false,
                grid: { rows: chartData1.length / COLUMNS, columns: COLUMNS, pattern: 'independent' },
                xaxis: {
                    color: darkMode ? "white" : "black",
                    automargin: true
                  },
                  yaxis: {
                    color: darkMode ? "white" : "black",
                    automargin: true
                  }
            }}
        />}   
        </Grid>
        <Grid item md={6} xs={12}>
        {chartData1 && <Plot 
            data={chartData2} 
            layout = {{
                plot_bgcolor: darkMode ? "black" : "white",
                paper_bgcolor: darkMode ? "black" : "white",
                showlegend: false,
                grid: { rows: chartData2.length / COLUMNS, columns: COLUMNS, pattern: 'independent' }
            }}
        />}   
        </Grid>
      </Grid>
    </SignalCard>
  );
};
export default SubPlot;
