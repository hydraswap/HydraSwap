import { Layout } from 'antd';
import React from 'react';
// import TopBar from './TopBar';
// import { CustomFooter as Footer } from './Footer';
import { CustomSidebar as Sidebar} from './Sidebar';
import { H5Header } from './H5Head';

const { Header, Content } = Layout;

export default function BasicLayout({ children }) {
  return (
    <React.Fragment>
      <H5Header />
      <Layout
        className="basic-layout-container"
        style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'row',
          background: '#000',
        }}
      >
        <Sidebar />
        <div style={{ flex: 1 }}>
          {/* <Header style={{ padding: 0, minHeight: 64, height: 'unset' }}>
            <TopBar />
          </Header> */}
          <Content>{children}</Content>
        </div>

        {/* <Footer /> */}
      </Layout>
    </React.Fragment>
  );
}
