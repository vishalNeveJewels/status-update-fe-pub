import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Layout from 'layout/Dashboard';
import ProtectedRoutes from 'components/protectedRoutes/ProtectedRoutes';
import { Navigate } from 'react-router';

// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));
// const Error404 = Loadable(lazy(() => import('components/Error404/Error404')));

// render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-Pages/sample-page')));
const VendorsPage = Loadable(lazy(() => import('pages/VendorsPage/VendorsPage')));
const VendorDetails = Loadable(lazy(() => import('pages/VendorsPage/VendorDetails')));
const VendorColumnMap = Loadable(lazy(() => import('pages/VendorsPage/ColumnMap')));
const VendorStatusMap = Loadable(lazy(() => import('pages/VendorsPage/StatusMap/CustomPaginationActionsTable')));
const VendorsFileUpload = Loadable(lazy(() => import('pages/VendorsPage/VendorFileUpload')));
const VendorsFileUploadedHistory = Loadable(lazy(() => import('pages/VendorsPage/VendorFileUplodedHistory')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  // errorElement: <Error404 />,
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Navigate to={`/vendors`} />
    },
    // {
    //   path: 'dashboard',
    //   element: (
    //     <ProtectedRoutes allowedRoles={['developer', 'newJewelers']}>
    //       <DashboardDefault />
    //     </ProtectedRoutes>
    //   )
    // },
    {
      path: '/vendors',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers']}>
          <VendorsPage />
        </ProtectedRoutes>
      )
    },

    {
      path: '/vendors/:id',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers']}>
          <VendorDetails />
        </ProtectedRoutes>
      )
    },
    {
      path: '/vendors/:id/column-map',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers']}>
          <VendorColumnMap />
        </ProtectedRoutes>
      )
    },
    {
      path: '/vendors/:id/status-map',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers']}>
          <VendorStatusMap />
        </ProtectedRoutes>
      )
    },
    {
      path: '/vendors/:id/upload',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers', 'vendor']}>
          <VendorsFileUpload />
        </ProtectedRoutes>
      )
    },
    {
      path: '/vendors/:id/upload-history',
      element: (
        <ProtectedRoutes allowedRoles={['developer', 'newJewelers', 'vendor']}>
          <VendorsFileUploadedHistory />
        </ProtectedRoutes>
      )
    }
  ]
};

export default MainRoutes;
