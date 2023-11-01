import { Fragment } from 'react';

// Cấu hình router bằng BrowserRouter trong lib react-router-dom
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from '~/components/Layout';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Lọc ra những Routes */}
                    {publicRoutes.map((route, index) => {
                        // Mặc định sẽ là DefaultLayout
                        let Layout = DefaultLayout;
                        // Nếu route tồn tại thuộc tính layout
                        if (route.layout) {
                            // Thì sẽ ghi đề lại Layout
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        {/* Children Content */}
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
// Development: npm start/ yarn start => CSS internals
// Production: npm build
