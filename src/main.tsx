import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './styles/index.css'
// import App from './App.tsx'
// import { RouterIndex } from './components/router/index.tsx';
// import { BrowserRouter,Routes,Route } from 'react-router-dom';
// import { CallbackHook } from './components/hooks/usecallback.tsx';
// import MemoHook from './components/hooks/useMemo'
// import HocComponent from './components/samples/withHoc';
// import SimpleContactForm from './components/fun/simple'
// import { SimpleSignUp } from './components/login/sample2'
// import { SimpleLogin } from './components/login/sample1';
// import { Log } from './components/login/log'
// import store from './components/redux/store'
// import { Counter } from './components/redux/counter'
// import { Provider } from 'react-redux';
import { NormalLogin } from './components/fun/login'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <BrowserRouter>
      <RouterIndex/>
    </BrowserRouter> */}
    {/* <CallbackHook/> */}
    {/* <MemoHook/> */}
    {/* <HocComponent/> */}
    {/* <SimpleContactForm/> */}
    {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<SimpleLogin/>}/>
        <Route path='/sample2' element={<SimpleSignUp/>}/>
      </Routes>
    </BrowserRouter> */}
    {/* <Provider store={store}>
      <Counter />
    </Provider> */}
    <NormalLogin/>
  </StrictMode >,
)
