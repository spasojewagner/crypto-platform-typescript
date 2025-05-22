import WalletDashBoard from '../../cryptowallet2/WalletInMarket/WalletDashBoard';
import Sidebar2 from '../../cryptowallet2/SideBar2';
import WalletUser from '../../cryptowallet2/WalletInMarket/WalletUser';

export default function Wallet() {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div>
        {/* Leva navigacija */}
        <Sidebar2 />
      </div>

      {/*  Dashboard */}
      <div className='flex-1'>
        <WalletDashBoard />
      </div>
      <WalletUser />
    </div>
  );
}
