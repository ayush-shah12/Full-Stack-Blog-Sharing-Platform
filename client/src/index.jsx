import { UserContextProvider } from "./UserContext/UserContext.jsx";
import ReactDOM from 'react-dom/client';
import RoutesProvider from "./Routes/Routes.jsx"


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>

    <RoutesProvider />

  </UserContextProvider>
)
