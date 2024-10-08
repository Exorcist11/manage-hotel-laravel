import { Route, Routes } from "react-router-dom";
import { dashboardRoute, publicRoute } from "./routers";
import { Fragment } from "react";
import clientLayout from "./components/Layout/clientLayout";
import DashboardLayout from "./components/Layout/DashboardLayout";
import { ProtectedRoute } from "./components/protectRoute";

function App() {
    return (
        <div className="bg-white h-full">
            <Routes>
                {publicRoute.map((route, index) => {
                    const Layout =
                        route.layout === null ? Fragment : clientLayout;
                    const Page = route.page;
                    return (
                        <Route
                            key={index}
                            path={route?.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {dashboardRoute.map((route, index) => {
                    const Layout =
                        route.layout === null ? Fragment : DashboardLayout;
                    const Page = route.page;

                    return (
                        <Route
                            key={index}
                            path={route?.path}
                            element={
                                <ProtectedRoute
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                    isAuthenticated={true} // Thay thế bằng logic xác thực của bạn
                                    // requiredRole={"Quản lý" || 'Nhân viên'} // Đặt vai trò cần thiết để truy cập
                                />
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
