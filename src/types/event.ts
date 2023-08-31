export interface EventState {
    login: string;
    password: string;
    error: string;
}
export type EventAction =
    | { type: 'loginUpdate'; login: string }
    | { type: 'passwordUpdate'; password: string }
    | { type: 'repPasswordUpdate'; repPassword: string }
    | { type: 'errorUpdate'; error: string };