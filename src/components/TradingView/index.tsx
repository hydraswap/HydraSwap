import * as React from 'react';
import './index.css';
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
} from '../../charting_library'; // Make sure to follow step 1 of the README
import { useMarket } from '../../utils/markets';
import { BONFIDA_DATA_FEED } from '../../utils/bonfidaConnector';
import { findTVMarketFromAddress } from '../../utils/tradingview';

// This is a basic example of how to create a TV widget
// You can add more feature such as storing charts in localStorage

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container_id'];
  theme: string;
}

export interface ChartContainerState {}

export const TVChartContainer = () => {
  // @ts-ignore
  const defaultProps: ChartContainerProps = {
    symbol: 'BTC/USDC',
    interval: '60' as ResolutionString,
    theme: 'Dark',
    containerId: 'tv_chart_container',
    datafeedUrl: BONFIDA_DATA_FEED,
    libraryPath: '/charting_library/',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {
      'volume.volume.color.1': '#07EBAD',
      'volume.volume.color.0': '#D83AEC',
    },
  };

  const tvWidgetRef = React.useRef<IChartingLibraryWidget | null>(null);
  const { market } = useMarket();

  React.useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: findTVMarketFromAddress(
        market?.address.toBase58() || '',
      ) as string,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl,
      ),
      interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container_id: defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: defaultProps.libraryPath as string,
      locale: 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      load_last_chart: true,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      autosize: defaultProps.autosize,
      studies_overrides: defaultProps.studiesOverrides,
      theme: 'Dark',
      overrides: {
        'paneProperties.background': '#020F16',
        'paneProperties.vertGridProperties.color': '#1D1D1D',
        'paneProperties.horzGridProperties.color': '#1D1D1D',
        'paneProperties.crossHairProperties.color': '#767988',
        'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.1)',
        'scalesProperties.textColor': '#7d7d7d',
        'mainSeriesProperties.candleStyle.wickUpColor': '#07EBAD', // 蜡烛成交上线颜色
        'mainSeriesProperties.candleStyle.wickDownColor': '#D83AEC', // 蜡烛成交下颜色
        'mainSeriesProperties.candleStyle.borderUpColor': '#07EBAD', // 蜡烛边框
        'mainSeriesProperties.candleStyle.borderDownColor': '#D83AEC', // 蜡烛边框
        'mainSeriesProperties.candleStyle.upColor': '#07EBAD',
        'mainSeriesProperties.candleStyle.downColor': '#D83AEC',
        'scalesProperties.backgroundColor' : '#020F16',
        'mainSeriesProperties.hollowCandleStyle.upColor': '#07EBAD',
        'mainSeriesProperties.hollowCandleStyle.downColor': '#D83AEC',
        'mainSeriesProperties.haStyle.upColor': '#07EBAD',
        'mainSeriesProperties.haStyle.downColor': '#D83AEC',
        'mainSeriesProperties.barStyle.upColor': '#07EBAD',
        'mainSeriesProperties.barStyle.downColor': '#D83AEC'
      },
    };

    const tvWidget = new widget(widgetOptions);
    tvWidgetRef.current = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('It works!!');
            },
          }),
        );
        button.innerHTML = 'Check API';
      });
    });
  }, [market]);

  return <div id={defaultProps.containerId} className="tradingview-chart"/>;
};
