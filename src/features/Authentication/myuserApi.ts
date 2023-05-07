import { createAsyncThunk } from '@reduxjs/toolkit';
import * as D from 'io-ts/Decoder';

const role = D.literal('mentee', 'mentor', 'admin');

const userCodec = D.struct({
  account_id: D.string,
  active: D.boolean,
  created: D.string,
  display_name: D.string,
  id: D.string,
  role: role,
  updated: D.string,
});

const accountCodec = D.struct({
  active: D.boolean,
  created: D.string,
  email: D.string,
  id: D.string,
  login_name: D.string,
  role: role,
  updated: D.string,
});

const myuserResponse = D.struct({
  account: accountCodec,
  user: userCodec,
});

export const fetchMyUser = createAsyncThunk('user/fetchMyuser', async () => {
  const response = await fetch('/api/myuser');
  const responseJson = await response.json();
  const decoded = myuserResponse.decode(responseJson);
  return decoded;
});
