import React from 'react';
import { ConfigProvider, Table } from 'antd';
import NoDataIcon from '../../assets/img/icon_NoDate@2x.png';

export default function DataTable({
  dataSource,
  columns,
  emptyLabel = 'No data',
  pagination = false,
  loading = false,
  pageSize = 10,
}) {
  const customizeRenderEmpty = () => (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{textAlign: 'center'}}>
        <img src={NoDataIcon} style={{width: '80px', height: '80px'}}/>
      </div>
      <p>{emptyLabel}</p>
    </div>
  );

  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={pagination ? { pagination: true, pageSize } : false}
        loading={loading}
      />
    </ConfigProvider>
  );
}
