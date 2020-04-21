
import {HomeScreen} from '../screens/home';
import {LoginScreen} from '../screens/login';
import {ItemsScreen, ItemScreen} from '../screens/items';
import { MainScreen } from '../screens/main';
import { UnitsScreen, UnitScreen} from '../screens/units';
import { StocksScreen, StockScreen} from '../screens/stocks';
import { TransactionScreen, TransactionsScreen } from '../screens/transactions';
import {ItemPicker, UnitPicker} from '../screens/stocks/form/pickers';


export const routes = [
    
    {name: "Login", component: LoginScreen},
    {name: "Main", component: MainScreen},
    {name: "Item", component: ItemScreen},
    {name: "Unit", component: UnitScreen},
    {name: "Stock", component: StockScreen},
    {name: "Transaction", component: TransactionScreen},
    {name: "ItemPicker", component: ItemPicker},
    {name: "UnitPicker", component: UnitPicker},
    
    
];

export const drawerRoutes = [
    {name: "Home", component: HomeScreen},
    {name: "Items", component: ItemsScreen},
    {name: "Units", component: UnitsScreen},
    {name: "Stocks", component: StocksScreen},
    {name: "Transactions", component: TransactionsScreen}
];


