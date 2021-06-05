import { Button, Col, Divider, Popover, Row } from 'antd';
import React, { useState } from 'react';
import FloatingElement from './layout/FloatingElement';
import styled from 'styled-components';
import {
  useBalances,
  useMarket,
  useSelectedBaseCurrencyAccount,
  useSelectedOpenOrdersAccount,
  useSelectedQuoteCurrencyAccount,
  useTokenAccounts,
} from '../utils/markets';
import DepositDialog from './DepositDialog';
import { useWallet } from '../utils/wallet';
import Link from './Link';
import { settleFunds } from '../utils/send';
import { useSendConnection } from '../utils/connection';
import { notify } from '../utils/notifications';
import { Balances } from '../utils/types';
import StandaloneTokenAccountsSelect from './StandaloneTokenAccountSelect';
import LinkAddress from './LinkAddress';
import { InfoCircleOutlined } from '@ant-design/icons';

const RowBox = styled(Row)`
  padding-bottom: 20px;
`;

const Tip = styled.p`
  font-size: 12px;
  padding-top: 6px;
  color: #D038E4;
`;

const ActionButton = styled(Button)`
  /* color: #07ebad; */
  /* background-color: #212734; */
  /* border-width: 0px; */
  height: 28px;
`;

export default function StandaloneBalancesDisplay({ smallScreen }) {
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const balances = useBalances();
  const openOrdersAccount = useSelectedOpenOrdersAccount(true);
  const connection = useSendConnection();
  const { providerUrl, providerName, wallet, connected } = useWallet();
  const [baseOrQuote, setBaseOrQuote] = useState('');
  const baseCurrencyAccount = useSelectedBaseCurrencyAccount();
  const quoteCurrencyAccount = useSelectedQuoteCurrencyAccount();
  const [tokenAccounts] = useTokenAccounts();
  const baseCurrencyBalances =
    balances && balances.find((b) => b.coin === baseCurrency);
  const quoteCurrencyBalances =
    balances && balances.find((b) => b.coin === quoteCurrency);

  async function onSettleFunds() {
    if (!wallet) {
      notify({
        message: 'Wallet not connected',
        description: 'wallet is undefined',
        type: 'error',
      });
      return;
    }

    if (!market) {
      notify({
        message: 'Error settling funds',
        description: 'market is undefined',
        type: 'error',
      });
      return;
    }
    if (!openOrdersAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }
    if (!baseCurrencyAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }
    if (!quoteCurrencyAccount) {
      notify({
        message: 'Error settling funds',
        description: 'Open orders account is undefined',
        type: 'error',
      });
      return;
    }

    try {
      await settleFunds({
        market,
        openOrders: openOrdersAccount,
        connection,
        wallet,
        baseCurrencyAccount,
        quoteCurrencyAccount,
      });
    } catch (e) {
      notify({
        message: 'Error settling funds',
        description: e.message,
        type: 'error',
      });
    }
  }

  const formattedBalances: [
    string | undefined,
    Balances | undefined,
    string,
    string | undefined,
  ][] = [
    [
      baseCurrency,
      baseCurrencyBalances,
      'base',
      market?.baseMintAddress.toBase58(),
    ],
    [
      quoteCurrency,
      quoteCurrencyBalances,
      'quote',
      market?.quoteMintAddress.toBase58(),
    ],
  ];

  return (
    <FloatingElement style={
      smallScreen ? { flex: 1, paddingTop: 10, marginTop: 0, minHeight: 546 } : {
        flex: 1, paddingTop: 10, marginTop: 0, minHeight: 'calc(100vh - 507px)',
      }
    }>
      <Tip>
        <label style={{fontWeight: 700, color: '#DBDBDB', marginRight: '14px'}}>Asset Info</label>
        <span>All deposits go to your{' '}</span>
        <Link external to={providerUrl}>
          {providerName}
        </Link>{' '}
        <span>wallet</span>
      </Tip>
      {formattedBalances.map(
        ([currency, balances, baseOrQuote, mint], index) => (
          <React.Fragment key={index}>
            {/* <Divider style={{ borderColor: 'white' }}>
              {currency}{' '}
              {mint && (
                <Popover
                  content={<LinkAddress address={mint} />}
                  placement="bottomRight"
                  title="Token mint"
                  trigger="hover"
                >
                  <InfoCircleOutlined style={{ color: '#07ebad' }} />
                </Popover>
              )}
            </Divider> */}

            <Row align="middle" justify="start" style={{padding: '20px 0px'}}>
              <Col style={{flex: 1}}>
                {currency}{' '}
                {mint && (
                  <Popover
                  overlayClassName='ant-popover-address'
                    content={<LinkAddress address={mint} />}
                    placement="bottomRight"
                    title="Token mint"
                    trigger="hover"
                  >
                    <InfoCircleOutlined style={{ color: '#07ebad' }} />
                  </Popover>
                )}
              </Col>
              <Col>
                <ActionButton
                  ghost
                  onClick={() => setBaseOrQuote(baseOrQuote)}
                >
                  Deposit
                </ActionButton>
              </Col>
              <Col style={{marginLeft: 12}}>
                <ActionButton ghost onClick={onSettleFunds}>
                  Settle
                </ActionButton>
              </Col>
            </Row>

            {connected && (
              <Row align="middle" style={{ padding: '0px 12px', 
                border: '1px solid rgba(255, 255, 255, 0.5)', 
                borderRadius: '10px', 
                fontSize: '12px', 
                display: 'flex',
                position: 'relative'
              }}>
                <StandaloneTokenAccountsSelect
                  accounts={tokenAccounts?.filter(
                    (account) => account.effectiveMint.toBase58() === mint,
                  )}
                  mint={mint}
                  label
                />
              </Row>
            )}

            <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px'}}>
              <Col>
                <div>{balances && balances.wallet || '0.00'}</div>
                <div style={{color: 'rgba(255, 255, 255, 0.5)'}}>Wallet balance</div>
              </Col>
              <Col style={{textAlign: 'right'}}>
                <div>{balances && balances.unsettled || '0.00'}</div>
                <div style={{color: 'rgba(255, 255, 255, 0.5)'}}>Unsettled balance</div>
              </Col>
            </Row>

            {/* <RowBox
              align="middle"
              justify="space-between"
              style={{ paddingBottom: 12 }}
            >
              <Col>Wallet balance:</Col>
              <Col>{balances && balances.wallet}</Col>
            </RowBox>
            <RowBox
              align="middle"
              justify="space-between"
              style={{ paddingBottom: 12 }}
            >
              <Col>Unsettled balance:</Col>
              <Col>{balances && balances.unsettled}</Col>
            </RowBox> */}

            {/* <RowBox align="middle" justify="space-around">
              <Col style={{ width: 150 }}>
                <ActionButton
                  block
                  size="large"
                  onClick={() => setBaseOrQuote(baseOrQuote)}
                >
                  Deposit
                </ActionButton>
              </Col>
              <Col style={{ width: 150 }}>
                <ActionButton block size="large" onClick={onSettleFunds}>
                  Settle
                </ActionButton>
              </Col>
            </RowBox> */}
            {/* <Tip>
              All deposits go to your{' '}
              <Link external to={providerUrl}>
                {providerName}
              </Link>{' '}
              wallet
            </Tip> */}
          </React.Fragment>
        ),
      )}
      <DepositDialog
        baseOrQuote={baseOrQuote}
        onClose={() => setBaseOrQuote('')}
      />
    </FloatingElement>
  );
}
