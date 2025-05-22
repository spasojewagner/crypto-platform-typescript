// import { useEffect } from 'react'
import Sidebar2 from '../../cryptowallet2/SideBar2'
import OrdersApp from '../orders/OrdersApp'
import DetailsView from './DeatailsView'
import MarketCurrencies from './MarketCurrencies'
// import { fetchMarketCurrencies } from '../../http/index'

type Props = {}

function TradeApp({}: Props) {
  return (
 <div className="flex  min-h-screen bg-gray-900 text-white">
      <div>
        <Sidebar2/>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-1 ">
           <DetailsView />
           <div>
           <h1 className="text-2xl font-bold mb-8 mt-6  text-white">Orders</h1>
              <OrdersApp/>
           </div>
         
          <div className="flex mt-6 space-x-6">
            <MarketCurrencies />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradeApp

