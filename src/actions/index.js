import {
  ORIGINAL_GETLIST,
  ORIGINAL_GETLIST_SUCCESS,
  ORIGINAL_GETLIST_FAILURE,
  ORIGINAL_BULKINSERT,
  ORIGINAL_BULKINSERT_SUCCESS,
  ORIGINAL_BULKINSERT_FAILURE,
  ORIGINAL_INSERT,
  ORIGINAL_INSERT_SUCCESS,
  ORIGINAL_INSERT_FAILURE,
  ORIGINAL_MODIFY,
  ORIGINAL_MODIFY_SUCCESS,
  ORIGINAL_MODIFY_FAILURE,
  ORIGINAL_REMOVE,
  ORIGINAL_REMOVE_SUCCESS,
  ORIGINAL_REMOVE_FAILURE,
  ORIGINAL_REMOVEALL,
  ORIGINAL_REMOVEALL_SUCCESS,
  ORIGINAL_REMOVEALL_FAILURE,
  VINTAGE_GETLIST,
  VINTAGE_GETLIST_SUCCESS,
  VINTAGE_GETLIST_FAILURE,
  VINTAGE_INSERT,
  VINTAGE_INSERT_SUCCESS,
  VINTAGE_INSERT_FAILURE,
  VINTAGE_MODIFY,
  VINTAGE_MODIFY_SUCCESS,
  VINTAGE_MODIFY_FAILURE,
  VINTAGE_REMOVE,
  VINTAGE_REMOVE_SUCCESS,
  VINTAGE_REMOVE_FAILURE,
  VINTAGE_REMOVEALL,
  VINTAGE_REMOVEALL_SUCCESS,
  VINTAGE_REMOVEALL_FAILURE,
  SALE_GETLIST,
  SALE_GETLIST_SUCCESS,
  SALE_GETLIST_FAILURE,
  SALE_INSERT,
  SALE_INSERT_SUCCESS,
  SALE_INSERT_FAILURE,
  SALE_BULKINSERT,
  SALE_BULKINSERT_SUCCESS,
  SALE_BULKINSERT_FAILURE,
  SALE_MODIFY,
  SALE_MODIFY_SUCCESS,
  SALE_MODIFY_FAILURE,
  SALE_BULKMODIFY,
  SALE_BULKMODIFY_SUCCESS,
  SALE_BULKMODIFY_FAILURE,
  SALE_REMOVE,
  SALE_REMOVE_SUCCESS,
  SALE_REMOVE_FAILURE,
  SALE_BULKREMOVE,
  SALE_BULKREMOVE_SUCCESS,
  SALE_BULKREMOVE_FAILURE,
  SALE_REMOVEALL,
  SALE_REMOVEALL_SUCCESS,
  SALE_REMOVEALL_FAILURE,
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAILURE,
  ACCOUNT_SESSION,
  ACCOUNT_SESSION_SUCCESS,
  ACCOUNT_SESSION_FAILURE,
  ACCOUNT_LOGOUT,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_LOGOUT_FAILURE,
  ACCOUNT_GETLIST,
  ACCOUNT_GETLIST_SUCCESS,
  ACCOUNT_GETLIST_FAILURE,
  ACCOUNT_INSERT,
  ACCOUNT_INSERT_SUCCESS,
  ACCOUNT_INSERT_FAILURE,
  ACCOUNT_MODIFY,
  ACCOUNT_MODIFY_SUCCESS,
  ACCOUNT_MODIFY_FAILURE,
  ACCOUNT_REMOVE,
  ACCOUNT_REMOVE_SUCCESS,
  ACCOUNT_REMOVE_FAILURE,
  ACCOUNT_REMOVEALL,
  ACCOUNT_REMOVEALL_SUCCESS,
  ACCOUNT_REMOVEALL_FAILURE,
  CUSTOMERACCOUNT_LOGIN,
  CUSTOMERACCOUNT_LOGIN_SUCCESS,
  CUSTOMERACCOUNT_LOGIN_FAILURE,
  CUSTOMERACCOUNT_SESSION,
  CUSTOMERACCOUNT_SESSION_SUCCESS,
  CUSTOMERACCOUNT_SESSION_FAILURE,
  CUSTOMERACCOUNT_LOGOUT,
  CUSTOMERACCOUNT_LOGOUT_SUCCESS,
  CUSTOMERACCOUNT_LOGOUT_FAILURE,
  SHOP_GETLIST,
  SHOP_GETLIST_SUCCESS,
  SHOP_GETLIST_FAILURE,
  SHOP_INSERT,
  SHOP_INSERT_SUCCESS,
  SHOP_INSERT_FAILURE,
  SHOP_MODIFY,
  SHOP_MODIFY_SUCCESS,
  SHOP_MODIFY_FAILURE,
  SHOP_REMOVE,
  SHOP_REMOVE_SUCCESS,
  SHOP_REMOVE_FAILURE,
  SHOP_REMOVEALL,
  SHOP_REMOVEALL_SUCCESS,
  SHOP_REMOVEALL_FAILURE,
  CUSTOMER_GETLIST,
  CUSTOMER_GETLIST_SUCCESS,
  CUSTOMER_GETLIST_FAILURE,
  CUSTOMER_INSERT,
  CUSTOMER_INSERT_SUCCESS,
  CUSTOMER_INSERT_FAILURE,
  CUSTOMER_MODIFY,
  CUSTOMER_MODIFY_SUCCESS,
  CUSTOMER_MODIFY_FAILURE,
  CUSTOMER_REMOVE,
  CUSTOMER_REMOVE_SUCCESS,
  CUSTOMER_REMOVE_FAILURE,
  CUSTOMER_REMOVEALL,
  CUSTOMER_REMOVEALL_SUCCESS,
  CUSTOMER_REMOVEALL_FAILURE,
  CUSTOMERBASE_PRELOGIN,
  CUSTOMERBASE_PRELOGIN_SUCCESS,
  CUSTOMERBASE_PRELOGIN_FAILURE,
  CUSTOMERBASE_GETLIST,
  CUSTOMERBASE_GETLIST_SUCCESS,
  CUSTOMERBASE_GETLIST_FAILURE,
  CUSTOMERBASE_INSERT,
  CUSTOMERBASE_INSERT_SUCCESS,
  CUSTOMERBASE_INSERT_FAILURE,
  CUSTOMERBASE_MODIFY,
  CUSTOMERBASE_MODIFY_SUCCESS,
  CUSTOMERBASE_MODIFY_FAILURE,
  CUSTOMERBASE_REMOVE,
  CUSTOMERBASE_REMOVE_SUCCESS,
  CUSTOMERBASE_REMOVE_FAILURE,
  CUSTOMERBASE_REMOVEALL,
  CUSTOMERBASE_REMOVEALL_SUCCESS,
  CUSTOMERBASE_REMOVEALL_FAILURE,
  CUSTOMERBASE_GETSTORE,
  CUSTOMERBASE_GETSTORE_SUCCESS,
  CUSTOMERBASE_GETSTORE_FAILURE,
  CUSTOMERBASE_GETHISTORY,
  CUSTOMERBASE_GETHISTORY_SUCCESS,
  CUSTOMERBASE_GETHISTORY_FAILURE,
  CUSTOMERBASE_FINDPASSWORD,
  CUSTOMERBASE_FINDPASSWORD_SUCCESS,
  CUSTOMERBASE_FINDPASSWORD_FAILURE,
  STORE_GETLIST,
  STORE_GETLIST_SUCCESS,
  STORE_GETLIST_FAILURE,
  STORE_INSERT,
  STORE_INSERT_SUCCESS,
  STORE_INSERT_FAILURE,
  STORE_BULKINSERT,
  STORE_BULKINSERT_SUCCESS,
  STORE_BULKINSERT_FAILURE,
  STORE_REMOVEALL,
  STORE_REMOVEALL_SUCCESS,
  STORE_REMOVEALL_FAILURE,
  GRAPE_GETLIST,
  GRAPE_GETLIST_SUCCESS,
  GRAPE_GETLIST_FAILURE,
  GRAPE_INSERT,
  GRAPE_INSERT_SUCCESS,
  GRAPE_INSERT_FAILURE,
  GRAPE_REMOVE,
  GRAPE_REMOVE_SUCCESS,
  GRAPE_REMOVE_FAILURE,
  GRAPE_REMOVEALL,
  GRAPE_REMOVEALL_SUCCESS,
  GRAPE_REMOVEALL_FAILURE,
  LOCATION_GETLIST,
  LOCATION_GETLIST_SUCCESS,
  LOCATION_GETLIST_FAILURE,
  LOCATION_INSERT,
  LOCATION_INSERT_SUCCESS,
  LOCATION_INSERT_FAILURE,
  LOCATION_REMOVE,
  LOCATION_REMOVE_SUCCESS,
  LOCATION_REMOVE_FAILURE,
  LOCATION_REMOVEALL,
  LOCATION_REMOVEALL_SUCCESS,
  LOCATION_REMOVEALL_FAILURE,
  EXCEL_TABLETOEXCEL,
  EXCEL_TABLETOEXCEL_SUCCESS,
  EXCEL_TABLETOEXCEL_FAILURE,
  EXCEL_EXCELTOTABLE,
  EXCEL_EXCELTOTABLE_SUCCESS,
  EXCEL_EXCELTOTABLE_FAILURE,
  CONFIGURATION_GET,
  CONFIGURATION_GET_SUCCESS,
  CONFIGURATION_GET_FAILURE,
  CONFIGURATION_MODIFY,
  CONFIGURATION_MODIFY_SUCCESS,
  CONFIGURATION_MODIFY_FAILURE,
} from './actions';

import original from './original';
import account from './account';
import vintage from './vintage';
import sale from './sale';
import shop from './shop';
import customer from './customer';
import customerBase from './customerBase';
import store from './store';
import grape from './grape';
import location from './location';
import customerAccount from './customerAccount';
import excel from './excel';
import configuration from './configuration';

const actions = {
  ORIGINAL_GETLIST,
  ORIGINAL_GETLIST_SUCCESS,
  ORIGINAL_GETLIST_FAILURE,
  ORIGINAL_BULKINSERT,
  ORIGINAL_BULKINSERT_SUCCESS,
  ORIGINAL_BULKINSERT_FAILURE,
  ORIGINAL_INSERT,
  ORIGINAL_INSERT_SUCCESS,
  ORIGINAL_INSERT_FAILURE,
  ORIGINAL_MODIFY,
  ORIGINAL_MODIFY_SUCCESS,
  ORIGINAL_MODIFY_FAILURE,
  ORIGINAL_REMOVE,
  ORIGINAL_REMOVE_SUCCESS,
  ORIGINAL_REMOVE_FAILURE,
  ORIGINAL_REMOVEALL,
  ORIGINAL_REMOVEALL_SUCCESS,
  ORIGINAL_REMOVEALL_FAILURE,
  VINTAGE_GETLIST,
  VINTAGE_GETLIST_SUCCESS,
  VINTAGE_GETLIST_FAILURE,
  VINTAGE_INSERT,
  VINTAGE_INSERT_SUCCESS,
  VINTAGE_INSERT_FAILURE,
  VINTAGE_MODIFY,
  VINTAGE_MODIFY_SUCCESS,
  VINTAGE_MODIFY_FAILURE,
  VINTAGE_REMOVE,
  VINTAGE_REMOVE_SUCCESS,
  VINTAGE_REMOVE_FAILURE,
  VINTAGE_REMOVEALL,
  VINTAGE_REMOVEALL_SUCCESS,
  VINTAGE_REMOVEALL_FAILURE,
  SALE_GETLIST,
  SALE_GETLIST_SUCCESS,
  SALE_GETLIST_FAILURE,
  SALE_INSERT,
  SALE_INSERT_SUCCESS,
  SALE_INSERT_FAILURE,
  SALE_BULKINSERT,
  SALE_BULKINSERT_SUCCESS,
  SALE_BULKINSERT_FAILURE,
  SALE_MODIFY,
  SALE_MODIFY_SUCCESS,
  SALE_MODIFY_FAILURE,
  SALE_BULKMODIFY,
  SALE_BULKMODIFY_SUCCESS,
  SALE_BULKMODIFY_FAILURE,
  SALE_REMOVE,
  SALE_REMOVE_SUCCESS,
  SALE_REMOVE_FAILURE,
  SALE_BULKREMOVE,
  SALE_BULKREMOVE_SUCCESS,
  SALE_BULKREMOVE_FAILURE,
  SALE_REMOVEALL,
  SALE_REMOVEALL_SUCCESS,
  SALE_REMOVEALL_FAILURE,
  ACCOUNT_LOGIN,
  ACCOUNT_LOGIN_SUCCESS,
  ACCOUNT_LOGIN_FAILURE,
  ACCOUNT_SESSION,
  ACCOUNT_SESSION_SUCCESS,
  ACCOUNT_SESSION_FAILURE,
  ACCOUNT_LOGOUT,
  ACCOUNT_LOGOUT_SUCCESS,
  ACCOUNT_LOGOUT_FAILURE,
  ACCOUNT_GETLIST,
  ACCOUNT_GETLIST_SUCCESS,
  ACCOUNT_GETLIST_FAILURE,
  ACCOUNT_INSERT,
  ACCOUNT_INSERT_SUCCESS,
  ACCOUNT_INSERT_FAILURE,
  ACCOUNT_MODIFY,
  ACCOUNT_MODIFY_SUCCESS,
  ACCOUNT_MODIFY_FAILURE,
  ACCOUNT_REMOVE,
  ACCOUNT_REMOVE_SUCCESS,
  ACCOUNT_REMOVE_FAILURE,
  ACCOUNT_REMOVEALL,
  ACCOUNT_REMOVEALL_SUCCESS,
  ACCOUNT_REMOVEALL_FAILURE,
  CUSTOMERACCOUNT_LOGIN,
  CUSTOMERACCOUNT_LOGIN_SUCCESS,
  CUSTOMERACCOUNT_LOGIN_FAILURE,
  CUSTOMERACCOUNT_SESSION,
  CUSTOMERACCOUNT_SESSION_SUCCESS,
  CUSTOMERACCOUNT_SESSION_FAILURE,
  CUSTOMERACCOUNT_LOGOUT,
  CUSTOMERACCOUNT_LOGOUT_SUCCESS,
  CUSTOMERACCOUNT_LOGOUT_FAILURE,
  SHOP_GETLIST,
  SHOP_GETLIST_SUCCESS,
  SHOP_GETLIST_FAILURE,
  SHOP_INSERT,
  SHOP_INSERT_SUCCESS,
  SHOP_INSERT_FAILURE,
  SHOP_MODIFY,
  SHOP_MODIFY_SUCCESS,
  SHOP_MODIFY_FAILURE,
  SHOP_REMOVE,
  SHOP_REMOVE_SUCCESS,
  SHOP_REMOVE_FAILURE,
  SHOP_REMOVEALL,
  SHOP_REMOVEALL_SUCCESS,
  SHOP_REMOVEALL_FAILURE,
  CUSTOMER_GETLIST,
  CUSTOMER_GETLIST_SUCCESS,
  CUSTOMER_GETLIST_FAILURE,
  CUSTOMER_INSERT,
  CUSTOMER_INSERT_SUCCESS,
  CUSTOMER_INSERT_FAILURE,
  CUSTOMER_MODIFY,
  CUSTOMER_MODIFY_SUCCESS,
  CUSTOMER_MODIFY_FAILURE,
  CUSTOMER_REMOVE,
  CUSTOMER_REMOVE_SUCCESS,
  CUSTOMER_REMOVE_FAILURE,
  CUSTOMER_REMOVEALL,
  CUSTOMER_REMOVEALL_SUCCESS,
  CUSTOMER_REMOVEALL_FAILURE,
  CUSTOMERBASE_PRELOGIN,
  CUSTOMERBASE_PRELOGIN_SUCCESS,
  CUSTOMERBASE_PRELOGIN_FAILURE,
  CUSTOMERBASE_GETLIST,
  CUSTOMERBASE_GETLIST_SUCCESS,
  CUSTOMERBASE_GETLIST_FAILURE,
  CUSTOMERBASE_INSERT,
  CUSTOMERBASE_INSERT_SUCCESS,
  CUSTOMERBASE_INSERT_FAILURE,
  CUSTOMERBASE_MODIFY,
  CUSTOMERBASE_MODIFY_SUCCESS,
  CUSTOMERBASE_MODIFY_FAILURE,
  CUSTOMERBASE_REMOVE,
  CUSTOMERBASE_REMOVE_SUCCESS,
  CUSTOMERBASE_REMOVE_FAILURE,
  CUSTOMERBASE_REMOVEALL,
  CUSTOMERBASE_REMOVEALL_SUCCESS,
  CUSTOMERBASE_REMOVEALL_FAILURE,
  CUSTOMERBASE_GETSTORE,
  CUSTOMERBASE_GETSTORE_SUCCESS,
  CUSTOMERBASE_GETSTORE_FAILURE,
  CUSTOMERBASE_GETHISTORY,
  CUSTOMERBASE_GETHISTORY_SUCCESS,
  CUSTOMERBASE_GETHISTORY_FAILURE,
  CUSTOMERBASE_FINDPASSWORD,
  CUSTOMERBASE_FINDPASSWORD_SUCCESS,
  CUSTOMERBASE_FINDPASSWORD_FAILURE,
  STORE_GETLIST,
  STORE_GETLIST_SUCCESS,
  STORE_GETLIST_FAILURE,
  STORE_INSERT,
  STORE_INSERT_SUCCESS,
  STORE_INSERT_FAILURE,
  STORE_BULKINSERT,
  STORE_BULKINSERT_SUCCESS,
  STORE_BULKINSERT_FAILURE,
  STORE_REMOVEALL,
  STORE_REMOVEALL_SUCCESS,
  STORE_REMOVEALL_FAILURE,
  GRAPE_GETLIST,
  GRAPE_GETLIST_SUCCESS,
  GRAPE_GETLIST_FAILURE,
  GRAPE_INSERT,
  GRAPE_INSERT_SUCCESS,
  GRAPE_INSERT_FAILURE,
  GRAPE_REMOVE,
  GRAPE_REMOVE_SUCCESS,
  GRAPE_REMOVE_FAILURE,
  GRAPE_REMOVEALL,
  GRAPE_REMOVEALL_SUCCESS,
  GRAPE_REMOVEALL_FAILURE,
  LOCATION_GETLIST,
  LOCATION_GETLIST_SUCCESS,
  LOCATION_GETLIST_FAILURE,
  LOCATION_INSERT,
  LOCATION_INSERT_SUCCESS,
  LOCATION_INSERT_FAILURE,
  LOCATION_REMOVE,
  LOCATION_REMOVE_SUCCESS,
  LOCATION_REMOVE_FAILURE,
  LOCATION_REMOVEALL,
  LOCATION_REMOVEALL_SUCCESS,
  LOCATION_REMOVEALL_FAILURE,
  EXCEL_TABLETOEXCEL,
  EXCEL_TABLETOEXCEL_SUCCESS,
  EXCEL_TABLETOEXCEL_FAILURE,
  EXCEL_EXCELTOTABLE,
  EXCEL_EXCELTOTABLE_SUCCESS,
  EXCEL_EXCELTOTABLE_FAILURE,
  CONFIGURATION_GET,
  CONFIGURATION_GET_SUCCESS,
  CONFIGURATION_GET_FAILURE,
  CONFIGURATION_MODIFY,
  CONFIGURATION_MODIFY_SUCCESS,
  CONFIGURATION_MODIFY_FAILURE,
};

export {
  actions,
  original,
  account,
  vintage,
  shop,
  sale,
  customer,
  store,
  grape,
  location,
  customerBase,
  customerAccount,
  excel,
  configuration,
};
