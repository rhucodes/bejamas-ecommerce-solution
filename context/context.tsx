import { createContext, FC, useReducer } from 'react';
import { AppActions } from './actions';
import { appReducer } from './reducer';
import { AppState, initialAppState } from './state';

export const AppContext = createContext<{
	state: AppState;
	dispatch: React.Dispatch<AppActions>;
}>({
	state: initialAppState,
	dispatch: () => undefined,
});

export const AppContextProvider: FC = ({ children }) => {
	const [state, dispatch] = useReducer(appReducer, initialAppState);

	const value = { state, dispatch };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
