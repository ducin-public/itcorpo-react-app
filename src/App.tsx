import { Fadebox } from './components/Generic/Fadebox';
import { AppRoutes } from './AppRoutes';
import { AppProviders } from './AppProviders';

export function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <Fadebox>
        <div>Your content here</div>
      </Fadebox>
    </AppProviders>
  );
}
