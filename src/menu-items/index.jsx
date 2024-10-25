// project import
import { getItemFromLocalStorage } from 'utils/localStorageUtils';
// import dashboard from './dashboard';
// import authentication from './page';
// import utilities from './utilities';
// import support from './support';
import subRoutes from './subRoutes';

// ==============================|| MENU ITEMS ||============================== //
const isVendor = getItemFromLocalStorage('userTypeIs')?.userTypeName === 'vendor';
const conditionalMenu = [];

if (!isVendor) {
  // conditionalMenu.push(dashboard);
}
const menuItems = {
  items: [...conditionalMenu, subRoutes]
};

export default menuItems;
