// assets
import { BranchesOutlined, ColumnWidthOutlined, FolderOpenOutlined, UsergroupAddOutlined } from '@ant-design/icons';

// icons
const icons = {
  FolderOpenOutlined,
  BranchesOutlined,
  ColumnWidthOutlined,
  UsergroupAddOutlined
};

// ==============================|| MENU ITEMS - SUBROUTES ||============================== //

const subRoutes = {
  id: 'subRoutes',
  title: 'Sub Routes',
  type: 'group',
  children: [
    {
      id: 'record-page',
      title: 'Vendors',
      type: 'item',
      url: '/vendors',
      icon: icons.FolderOpenOutlined
    }
  ]
};

export default subRoutes;
