import React, {createContext} from 'react';

export interface Network {
  state: string;
  setState?: React.Dispatch<React.SetStateAction<string>>;
}

const network: Network = {
  state: 'loading',
};

const NetworkContext = createContext(network);

export default NetworkContext;
