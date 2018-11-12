/**
 * Copyright (c) 2018-present, Leap DAO (leapdao.org)
 *
 * This source code is licensed under the GNU GENERAL PUBLIC LICENSE Version 3
 * found in the LICENSE file in the root directory of this source tree.
 */

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { DEFAULT_NETWORK } from './utils';

import Tokens from './stores/tokens.ts';
import Bridge from './stores/bridge.ts';
import Account from './stores/account.ts';
import Network from './stores/network.ts';
import ExplorerStore from './stores/explorer.ts';
import Unspents from './stores/unspents.ts';
import NodeStore from './stores/node.ts';
import Web3Store from './stores/web3.ts';

import Transactions from './components/txNotification/transactions.ts';
import TxNotification from './components/txNotification/index.tsx';

import Explorer from './routes/explorer';
import Faucet from './routes/faucet';
import Wallet from './routes/wallet';
import Slots from './routes/slots';
import RegisterToken from './routes/registerToken';
import Status from './routes/status';

const web3 = new Web3Store();
const transactions = new Transactions();
const account = new Account(web3);
const node = new NodeStore(web3);
const bridge = new Bridge(account, transactions, web3);
const tokens = new Tokens(account, bridge, transactions, node, web3);
const explorer = new ExplorerStore(node, web3, tokens);
const network = new Network(
  account,
  web3,
  process.env.NETWORK_ID || DEFAULT_NETWORK
);
const unspents = new Unspents(bridge, account, node, web3);

web3.plasma.getConfig().then(({ bridgeAddr }) => {
  bridge.defaultAddress = bridgeAddr;
  ReactDOM.render(
    <BrowserRouter>
      <Provider
        {...{
          account,
          tokens,
          bridge,
          network,
          transactions,
          explorer,
          unspents,
          node,
          web3,
        }}
      >
        <Fragment>
          <TxNotification />
          <Route path="/" exact component={Slots} />
          <Route
            path="/:bridgeAddr(0x[0-9a-fA-f]{40})"
            exact
            component={Slots}
          />
          <Route path="/registerToken" exact component={RegisterToken} />
          <Route
            path="/registerToken/:bridgeAddr(0x[0-9a-fA-f]{40})"
            exact
            component={RegisterToken}
          />
          <Route path="/wallet" component={Wallet} />
          <Route path="/explorer" component={Explorer} />
          <Route path="/faucet" component={Faucet} />
          <Route path="/status" component={Status} />
        </Fragment>
      </Provider>
    </BrowserRouter>,
    document.getElementById('app')
  );
});
