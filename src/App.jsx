import { GlobalStyles } from './common/ui/global-styles/styles';
import { StoreProvider } from './common/providers/StoreProvider';
import React from "react";

import { Router } from './common/ui/router/Router.jsx';
import { AppContainer} from "./AppContainer";

function App() {
  return (
    <StoreProvider>
      <AppContainer>
        <Router/>
        <GlobalStyles/>
      </AppContainer>
    </StoreProvider>

  );
}
export default App;
