import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';

import AddTodo from './pages/AddTodo.jsx';
import EditTodo from './pages/EditTodo.jsx';

import VerifyComponent from './components/VerifyComponent.jsx';

import { RenderTaskListContext } from "./contexts/TaskListContext.jsx";

function Layout() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/" className="fs-3 fw-bold">
            Todos
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">Add New Todo</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
function App() {
  return (
    <RenderTaskListContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/add" element={<AddTodo />} />
            <Route path="/edit" element={
              <VerifyComponent>
                <EditTodo />
              </VerifyComponent>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RenderTaskListContext>
  );
}

export default App
