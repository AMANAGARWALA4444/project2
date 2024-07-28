import React, { useMemo } from 'react';
import styled from 'styled-components';
import { MainLayout } from './styles/Layouts';
import Orbit from './components/Orbit/Orbit';
import Navigation from './components/Navigation/Navigation';
import { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Expenses from './components/Expenses/Expenses';
import Income from './components/Incomes/Incomes';
import { useGlobalContext } from './context/globalContext';
import Transactions from './components/Transactions/Transactions';
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() 
{
  
  const [active, setActive] = useState(1);

  const global = useGlobalContext();

  console.log(global);

  const displayData = () =>
  {
    switch (active) 
    {
      case 1:
        return <Dashboard/>
      case 2:
        return <Transactions/>
      case 3:
        return <Income/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
    }
  }
  
  const OrbitMemory = useMemo(() => 
  {
    return <Orbit/>
  }, [])

  return (
    <AppStyled className = 'App'>
      {OrbitMemory}
      <MainLayout>
        <Navigation active = {active} setActive = {setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
      <ToastContainer />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-color : rgba(255, 0, 0, 0.05);
  background-size: cover;
  background-position: center;
  main
  {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
