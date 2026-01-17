import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { featureRoutes } from './routes.registry';
import { AuthMiddleware } from './middlewares';

const layoutMap = {
  dashboard: null,
  none: ({ children }) => children,
};

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {featureRoutes.map((route, index) => {
          const Layout = layoutMap[route.layout || 'none'];

          let element = <Layout>{route.element}</Layout>;

          if (route.protected) {
            element = (
              <AuthMiddleware>
                <Layout>{route.element}</Layout>
              </AuthMiddleware>
            );
          }

          return <Route key={index} path={route.path} element={element} />;
        })}

        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
