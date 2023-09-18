export type EventAction =
  | { type: 'loginUpdate'; login: string }
  | { type: 'passwordUpdate'; password: string }
  | { type: 'repPasswordUpdate'; repPassword: string }
  | { type: 'errorUpdate'; error: string }
  | { type: 'zeroing'};

export type EventFormAction =
| { type: 'serviceUpdate'; service: string }
| { type: 'logUpdate'; log: string }
| { type: 'passUpdate'; pass: string }
| { type: 'errorUpdate'; error: string }
| { type: 'zeroing'};