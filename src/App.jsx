import { GlobalStyles } from './common/ui/global-styles/styles';
import { StoreProvider } from './common/providers/StoreProvider';
import { TableOfContents } from "./modules/toc/ui/containers/TableOfContents.jsx";
import { TocPreloader } from "./modules/toc/ui/preloader/TocPreloader.jsx";
import { Header } from "./modules/header/ui/Header.jsx";

import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { Content } from "./modules/content/ui/Content.jsx";
import { setMenuConfig } from './menu-config.js'
import  { getConfig } from "./modules/toc/data-access/api";

const Wrapper = styled.div`   
`
const FlexWrapper = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect( () => {
    async function setConfig () {
      const data = await getConfig()
      console.log({data})
      setMenuConfig(data)
      setIsLoading(false)
    }
    setConfig().then(()=> console.log('Data was inited'))
  }, [])

  return (
    <StoreProvider>
      <Wrapper>
        <Header/>
        <FlexWrapper>
          {isLoading? <TocPreloader/> : <TableOfContents/>}
          <Content/>
        </FlexWrapper>
      </Wrapper>
      <GlobalStyles/>
    </StoreProvider>

  );
}
export default App;
