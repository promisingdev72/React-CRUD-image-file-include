// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import NotistackProvider from './components/NotistackProvider';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <NotistackProvider>
        <Router />
      </NotistackProvider>
    </ThemeConfig>
  );
}
