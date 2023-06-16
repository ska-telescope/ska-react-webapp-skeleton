/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { useTranslation } from 'react-i18next';
import SignalCard  from '../SignalCard/SignalCard';
import { storageObject } from '../../services/stateStorage';
import { COLOR, PROTOCOL } from '../../utils/constants';
import { Chart } from "react-google-charts";

interface SpectrumPlotProps {
  resize: number;
  socketStatus: string; 
  data: object;
}

const RATIO = 2;

const SpectrumPlot = ({ resize, socketStatus, data }: SpectrumPlotProps) => {
  const { t } = useTranslation();

  const [chartData, setChartData] = React.useState(null);
  const [showContent, setShowContent] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const { darkMode } = storageObject.useStore();

  const cardTitle = () => { 
    return `${t('label.socket')}: ${  socketStatus  }, ${t('label.serialisation')}: ${  PROTOCOL}`;
  }

  const chartTitle = () => {
    return '';
  }

  function xLabel() {
    return `${t('label.frequency')} (${t('units.frequency')})`;
  }

  const yLabel = () => { 
    return `${t('label.amplitude')}`;
  }

  const canShow = () => { 
    return data !== null;
  }

  const showToggle = () => { 
    setShowContent(showContent ? false : canShow());
  }

  function parentWidth() {
    // TODO : Make this responsive
    return 1400;
  }

  function getChartData(usedData: any) {
    if (!usedData.channels) {
      return [];
    }
    const chartData = [
      {
        x: usedData.channels,
        y: usedData.power,
        marker: {
          color: COLOR[0]
        }
      }
    ];
    return chartData;
  }

  React.useEffect(() => {
    if (data) {
      setChartData(getChartData(data));
    }
    setShowContent(canShow());
  }, [data]);

  React.useEffect(() => {
  }, [showContent]);

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
      data-testid="signalCardId"
      title={t('label.spectrumPlot')}
      actionTitle={cardTitle()}
      socketStatus={socketStatus}
      showContent={showContent}
      setShowContent={showToggle}
    >
      <Chart
          chartType="ScatterChart"
          data={chartData}
          width="100%"
          height="400px"
      />
    </SignalCard>
  );
};
export default SpectrumPlot;