import * as process from "process";

const ADDRESS = {
  NODE: process.env.REACT_APP_NODE_ADDRESS as string,
};

const LOCAL_STORAGE = {
  ACCOUNT: 'account',
};

const AZURE = {
  BLOB_STORAGE_SAS: process.env.REACT_APP_AZURE_BLOB_STORAGE_SAS as string
};

export { ADDRESS, LOCAL_STORAGE, AZURE };
