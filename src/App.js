import Container from "@mui/material/Container";
import {Routes} from "react-router-dom";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";

function App() {
    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Home/>
                    {/*<FullPost />*/}
                    {/*<AddPost />*/}
                    {/*<Login />*/}
                    {/*<Registration />*/}
                </Routes>
            </Container>
        </>
    );
}

export default App;
