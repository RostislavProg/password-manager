import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: "",
  accounts: [], //{login: 'Nikita', password: '123456', id: 1}
  accountsContent: []//{ userContent: [{ service: 'Facebook', log: 'NikitaFB', pass: '987654321', id: 12 }], id: 1 }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
      
      localStorage.setItem('userId', JSON.stringify(state.userId));
    },
    logout: (state) => {
      state.userId = "";

      localStorage.setItem('userId', JSON.stringify(state.userId));
    },
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
      state.accountsContent.push({userContent: [], id: action.payload.id});
      localStorage.setItem('accounts', JSON.stringify(state.accounts));
      localStorage.setItem('accountsContent', JSON.stringify(state.accountsContent));
    },
    addContent: (state, action) => {
      const index = state.accountsContent.findIndex(item => item.id === state.userId);
    
      state.accountsContent[index].userContent.push(action.payload);
      localStorage.setItem('accountsContent', JSON.stringify(state.accountsContent));
    },
    deleteContent: (state, action) => {
      const index = state.accountsContent.findIndex(item => item.id === state.userId);
      const contentIndex = state.accountsContent[index].userContent.findIndex(item => item.id === action.payload)
      
      state.accountsContent[index].userContent.splice(contentIndex, 1);
      localStorage.setItem('accountsContent', JSON.stringify(state.accountsContent));
    },
    editContent: (state, action) => {
      const { id, log, pass } = action.payload;
      const index = state.accountsContent.findIndex(item => item.id === state.userId);
      const contentIndex = state.accountsContent[index].userContent.findIndex(item => item.id === id)

      state.accountsContent[index].userContent[contentIndex].log = log;
      state.accountsContent[index].userContent[contentIndex].pass = pass;
      localStorage.setItem('accountsContent', JSON.stringify(state.accountsContent));
    },
    jsonContent: (state, action) => {
      const {jsonUserID, jsonAccounts, jsonAccountsContent} = action.payload;
      state.userId = jsonUserID ? jsonUserID : "";
      state.accounts = jsonAccounts ? jsonAccounts : [];
      state.accountsContent = jsonAccountsContent ? jsonAccountsContent : [];
    }
  },
});

export const { login, logout, addAccount, addContent, deleteContent, editContent, jsonContent } = authSlice.actions;

export default authSlice.reducer;