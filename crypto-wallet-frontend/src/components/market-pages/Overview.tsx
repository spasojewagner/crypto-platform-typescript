

import Sidebar2 from '../../cryptowallet2/SideBar2.tsx';
import StatsCards from '../../cryptowallet2/Overview/StatsCards.tsx';
import Chart from '../../cryptowallet2/Overview/Chart.tsx';
import BalanceCard from '../../cryptowallet2/Overview/BalanceCard.tsx';
import BuySellPanel from '../../cryptowallet2/Overview/BuySellPanel.tsx';

export default function Overview() {
  return (
    <div className="flex  min-h-screen bg-gray-900 text-white">
      <div>
        <Sidebar2/>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="p-6 flex-1 ">
          <StatsCards />
          <Chart/>
          <div className="flex mt-6 space-x-6">
            <BalanceCard balance={15453.05} change={12.34} />
            <BuySellPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
