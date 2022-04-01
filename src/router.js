import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MainPage from './page/mainpage'
import LoginPage from './page/loginpage'
import RegisterPage from './page/registerpage'

const Router = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router