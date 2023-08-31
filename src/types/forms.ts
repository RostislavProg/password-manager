export type FormtAction =
  | { type: 'logUpdate'; log: string }
  | { type: 'passUpdate'; pass: string }
  | { type: 'errorUpdate'; error: string };