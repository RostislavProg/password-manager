import { AUTORISATION } from "./type";
import { REGISTRATION } from "./type";
import { CHANGE_CURRENT } from "./type";
import { SAVE_UNITS } from "./type";


export const initialState = {
    currentAccount: 0,
    currentUnits: [],
    allUnits: [
    [
      {unitName: "Gmail", unitLogin: "Victor", unitPassword: "Vitya511"}, 
      {unitName: "YouTube", unitLogin: "Nikita", unitPassword: "GymBruh223"}
      
    ], 
    [
      {unitName: "Netflix", unitLogin: "Lera", unitPassword: "1RedRose"}, 
      {unitName: "Steam", unitLogin: "Vlad", unitPassword: "12345Victory"}
    ]
    ],
    accounts: [{name: "Rostislav", password: "12345"}, {name: "Logan", password: "54321"}]
  };

export const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTORISATION:

        const newCurrentAccount = state.accounts.findIndex(account => account.name === action.login);
        localStorage.setItem('currentAccount', newCurrentAccount);
        localStorage.setItem('accounts', JSON.stringify(state.accounts));
        localStorage.setItem('units', JSON.stringify(state.allUnits));
        
        return {
          ...state,
          currentAccount: newCurrentAccount,
          currentUnits: state.allUnits[newCurrentAccount]
        };
      case REGISTRATION:

        localStorage.setItem('currentAccount', state.accounts.findIndex(account => account.name === action.login));
        localStorage.setItem('accounts', JSON.stringify(state.accounts));
        localStorage.setItem('units', JSON.stringify(state.allUnits));

        return {
          ...state,
          accounts: [...state.accounts, {name: action.login, password: action.password}],
          allUnits: [...state.allUnits, []]
        };
      case CHANGE_CURRENT:

        let accountsCurrent = state.currentAccount;
        let accountsContent = state.accounts;
        let accountsAll = state.allUnits;
        if(localStorage.getItem('currentAccount') !== null && localStorage.getItem('accounts') !== null && localStorage.getItem('units') !== null){
          accountsCurrent = JSON.parse(localStorage.getItem('currentAccount'));
          accountsContent = JSON.parse(localStorage.getItem('accounts'));
          accountsAll = JSON.parse(localStorage.getItem('units'));
        }

        return {
          ...state,
          currentAccount: accountsCurrent,
          accounts: accountsContent,
          allUnits: accountsAll,
          currentUnits: state.allUnits[state.currentAccount]
          
        };
        case SAVE_UNITS:
          let newUnits = action.newUnits;
          if (!Array.isArray(newUnits)) {
            newUnits = [newUnits];
          }

          const newAllUnits = [
            ...state.allUnits.slice(0, state.currentAccount),
            newUnits, 
            ...state.allUnits.slice(state.currentAccount + 1), 
          ];

          localStorage.setItem('units', JSON.stringify(newAllUnits));

          return {
            ...state,
            allUnits: newAllUnits,
          };
      default:
        return state;
    }
  };

