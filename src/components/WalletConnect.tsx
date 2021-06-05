import React, { useState } from 'react';
import { Dropdown, Menu, Modal, Button } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';
import copy from 'copy-to-clipboard';
import { notify } from '../utils/notifications';
function copyAddress (address) {
  // this.setState({
  //   snackbarMessage: 'coop success',
  //   snackbarType: 'Info'
  // });
  // copy(this.state.currentAddress);
  copy(address);
  notify({
    message: 'Success',
    description: 'Copy Success',
    type: 'success',
  });
  // const snackbarObj = { snackbarMessage: 'copy success', snackbarType: 'Error' }
  // this.setState(snackbarObj);
}
export default function WalletConnect() {
  const { providerName, connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';
  const [showAccountModal, setShowAccountModal] = useState(false);
  // const menu = (
  //   <Menu>
  //     {connected && <LinkAddress shorten={true} address={publicKey} />}
  //     <Menu.Item key="3" onClick={select}>
  //       Change Wallet
  //     </Menu.Item>
  //   </Menu>
  // );

  // return (
  //   <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
  //     {connected ? 'Disconnect' : 'Connect'}
  //   </Dropdown.Button>
  // );
  
  
  return (
    <>
      {!connected ? 
      <div className="connect-wallet-btn" onClick={select}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#iconicon_wallet"></use>
        </svg>
        <span className="connect-text">Connect</span>
      </div>
      :
      <div className="connect-wallet-btn" onClick={() => setShowAccountModal(true)}>
        <span className="platform">{ providerName }</span>
        <span className="address">
          { publicKey.substr(0, 4) }
          ...
          { publicKey.substr(publicKey.length - 4, 4) }
        </span>
        <svg className="icon icon-down" aria-hidden="true">
          <use xlinkHref="#icondown"></use>
        </svg>
      </div>
      }
      <Modal
        title = "Account"
        okText="Connect"
        visible={showAccountModal}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowAccountModal(false)}
        width={430}
        footer={null}
        closeIcon={
          <svg className="icon modal-icon-close" aria-hidden="true">
            <use xlinkHref="#iconicon_close"></use>
          </svg>
        }
      >
        <div className="wallet-info">
           <div className="platform">Connected with {providerName}</div>
             <p className="address">
               { publicKey.substr(0, 7) }
               ...
               { publicKey.substr(publicKey.length - 4, 4) }
             </p>
           <div className="copy-and-view">
             <a className="copy" onClick={()=>copyAddress(publicKey)}>
               <svg className="icon" aria-hidden="true">
                 <use xlinkHref="#iconicon_copy"></use>
               </svg>
               <span>Copy Address</span>
             </a>
             <a className="view" target="_blank" href={`https://explorer.solana.com//address/${publicKey}`}>
               <svg className="icon" aria-hidden="true">
                 <use xlinkHref="#iconicon_The_top_right"></use>
               </svg>
               <span>View on explorer</span>
             </a>
           </div>
           <Button className="disconnect-btn" ghost onClick={disconnect}> DISCONNECT </Button>
         </div>
      </Modal>
      
    </>
  )
}
