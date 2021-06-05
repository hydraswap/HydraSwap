import React from 'react';
import { TokenAccount } from '../utils/types';
import { useSelectedTokenAccounts } from '../utils/markets';
import { Button, Col, Select, Typography } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { abbreviateAddress } from '../utils/utils';
import { notify } from '../utils/notifications';

export default function StandaloneTokenAccountsSelect({
  accounts,
  mint,
  label,
}: {
  accounts: TokenAccount[] | null | undefined;
  mint: string | undefined;
  label?: boolean;
}) {
  const [
    selectedTokenAccounts,
    setSelectedTokenAccounts,
  ] = useSelectedTokenAccounts();

  let selectedValue: string | undefined;
  if (mint && mint in selectedTokenAccounts) {
    selectedValue = selectedTokenAccounts[mint];
  } else if (accounts && accounts?.length > 0) {
    selectedValue = accounts[0].pubkey.toBase58();
  } else {
    selectedValue = undefined;
  }

  const setTokenAccountForCoin = (value) => {
    if (!mint) {
      notify({
        message: 'Error selecting token account',
        description: 'Mint is undefined',
        type: 'error',
      });
      return;
    }
    const newSelectedTokenAccounts = { ...selectedTokenAccounts };
    newSelectedTokenAccounts[mint] = value;
    setSelectedTokenAccounts(newSelectedTokenAccounts);
  };

  const toCopy = (value) => {
    navigator.clipboard.writeText(value)
    notify({
      message: 'Copy successfully',
      description: '',
      type: 'success',
    });
  }

  return (
    <React.Fragment>
      {label && <span>Token account:</span>}
      <Select
        // style={{ width: '100%', border: 'none' }}
        className="token-account-select"
        value={selectedValue}
        onSelect={setTokenAccountForCoin}
        suffixIcon={''}
      >
        {accounts?.map((account) => (
          <Select.Option
            key={account.pubkey.toBase58()}
            value={account.pubkey.toBase58()}
          >
            {/* <Typography.Text code> */}
              {label
                ? abbreviateAddress(account.pubkey, 8)
                : account.pubkey.toBase58()}
            {/* </Typography.Text> */}
          </Select.Option>
        ))}
      </Select>
      <Button
        shape="round"
        icon={<CopyOutlined />}
        size={'small'}
        style={{border: 'none', position: 'absolute', right: '0px', top: '4px'}}
        onClick={() =>
          selectedValue && toCopy(selectedValue)
        }
      />
    </React.Fragment>
  );
}
