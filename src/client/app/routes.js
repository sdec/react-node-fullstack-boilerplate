// Localized
import { HomeRoute } from './modules-localized/home';
import { AuthenticateRoute } from './modules-localized/authenticate';
// Delocalized
import { ChooseLanguageRoute } from './modules-delocalized/choose-language';

export const localizedRoutes = (locale) => [
  {
    path: `/${locale}/authenticate`,
    exact: false,
    component: AuthenticateRoute
  },
  {
    path: `/${locale}`,
    exact: true,
    component: HomeRoute
  }
];

export const delocalizedRoutes = () => [
  {
    path: `/`,
    exact: false,
    component: ChooseLanguageRoute
  }
];
