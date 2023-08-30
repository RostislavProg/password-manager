import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    info: {},
    content: {}
  },
  isAuthenticated: false,
  accounts: [], //{login: 'Nikita', password: '123456', id: 1}
  accountsContent: []//{userContent: [{ service: 'Facebook', log: 'NikitaFB', pass: '987654321' }], id: 1}
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const account = state.accounts.find(account => account.id === action.payload);
      const content = state.accountsContent.find(content => content.id === action.payload);
      state.user.info = account;
      state.user.content = content;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      const id = state.user.content.id
      const index = state.accountsContent.findIndex(item => item.id === id);

      state.accountsContent[index].userContent = state.user.content.userContent
      localStorage.setItem('accounts', JSON.stringify(state.accounts));
      localStorage.setItem('accountsContent', JSON.stringify(state.accountsContent));
      state.user.info = null;
      state.user.content = null
      state.isAuthenticated = false;
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
      state.accountsContent.push({userContent: [], id: action.payload.id});
    },
    addContent: (state, action) => {
      const {service, log, pass, id} = action.payload;
      state.user.content.userContent.push({ service, log, pass, id })
    },
    deleteContent: (state, action) => {
      const index = state.user.content.userContent.findIndex(item => item.id === action.payload);
      console.log(action.payload);
      state.user.content.userContent.splice(index, 1);
    },
    editContent: (state, action) => {
      const { id, log, pass } = action.payload;
      const index = state.user.content.userContent.findIndex(item => item.id === id);

      state.user.content.userContent[index].log = log;
      state.user.content.userContent[index].pass = pass;
    },
    jsonContent: (state, action) => {
      const {jsonAccounts, jsonAccountsContent} = action.payload;
      state.accounts = jsonAccounts;
      state.accountsContent = jsonAccountsContent;
    }
  },
});

export const { login, logout, addAccount, addContent, deleteContent, editContent, jsonContent } = authSlice.actions;

export default authSlice.reducer;