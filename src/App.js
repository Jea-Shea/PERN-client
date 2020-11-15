import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import Logo from './Components/Logo';
import NavTabs from './Components/NavTabs';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#bef67a',
      main: '#8bc34a',
      dark: '#5a9216',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Logo/>
        <NavTabs/>
      </div>
    </ThemeProvider>
  );
}

export default App;
