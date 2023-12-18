import { ThemeReducerType } from '../../types/themeType';

const DEFAULT = {
  theme: null,
};

type ActionType = {
  type: string;
  payload: number;
};

const themeReducer = (
  state: ThemeReducerType = DEFAULT,
  action: ActionType
) => {
  switch (action.type) {
    case 'auto':
    case 'light':
    case 'dark':
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return { ...state };
  }
};

export default themeReducer;
