import { createSelector } from 'reselect';
import { Session } from './Session';

export const sessionSelector = createSelector((state) => state, (state) => new Session(state.data));
