import { AUTORISATION } from "./type";
import { REGISTRATION } from "./type";
import { CHANGE_CURRENT } from "./type";
import { SAVE_UNITS } from "./type";
// Suggestions: you dont want to import one by one better to import all in once
import * as types from "./type";


// Questions: why initial state is not empty ?
export const initialState = {
    // Suggestions: i would expect current account to be one of objects from accounts, or call variable currentAccountId that will be value of logged in account uui
    currentAccount: 0,
    currentUnits: [],
    allUnits: [
    [
      // each unit should also have id that can be used to perform CRUD operations
      {unitName: "Gmail", unitLogin: "Victor", unitPassword: "Vitya511"},
      {unitName: "YouTube", unitLogin: "Nikita", unitPassword: "GymBruh223"}

    ],
    [
      {unitName: "Netflix", unitLogin: "Lera", unitPassword: "1RedRose"},
      {unitName: "Steam", unitLogin: "Vlad", unitPassword: "12345Victory"}
    ]
    ],
    // Suggestions: each account should have some kind of uuid. all credential(units) should be saved under related account it should make data manipulation much easier
    accounts: [{name: "Rostislav", password: "12345"}, {name: "Logan", password: "54321"}]
  };

export const accountsReducer = (state = initialState, action) => {
    switch (action.type) {
      // Suggestions: and use it like this
      case types.AUTORISATION:
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

