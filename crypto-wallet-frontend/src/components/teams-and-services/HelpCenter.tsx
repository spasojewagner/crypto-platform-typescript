import React, { useState, FC } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Bitcoin (BTC) absorbs the selling - is the bottom in?",
    answer: "Market analysis suggests that Bitcoin has shown strong resilience during recent selling pressure. While technical indicators point to potential support levels, cryptocurrency markets remain highly volatile. The 'bottom' in crypto markets is difficult to predict and depends on various factors including institutional adoption, regulatory developments, and macroeconomic conditions. Always conduct your own research and consider your risk tolerance before making investment decisions."
  },
  {
    question: "About official accounts and demo accounts",
    answer: "Official accounts are live trading accounts that use real money and execute actual trades in the market. Demo accounts are practice accounts with virtual funds that simulate real market conditions without financial risk. Demo accounts are perfect for beginners to learn trading strategies, test platforms, and gain experience. The main differences include: real vs. virtual money, actual market execution vs. simulation, and psychological factors that come with real money trading."
  },
  {
    question: "What is transaction volume?",
    answer: "Transaction volume refers to the total number of shares, contracts, or units of an asset that are traded during a specific time period. In cryptocurrency and forex markets, volume indicates market activity and liquidity. Higher volume typically suggests stronger price movements and better market liquidity, making it easier to enter and exit positions. Volume analysis is crucial for technical analysis as it helps confirm price trends and identify potential reversal points."
  },
  {
    question: "Why do we need to transfer funds?",
    answer: "Fund transfers are necessary to move money between different accounts or platforms for various purposes: moving funds from your bank to your trading account, transferring between different asset classes or trading instruments, withdrawing profits or depositing additional capital, and managing risk by diversifying across multiple platforms. Proper fund management ensures you have adequate capital for trading opportunities while maintaining security across different financial institutions."
  },
  {
    question: "What are futures?",
    answer: "Futures are financial contracts that obligate the buyer to purchase, or the seller to sell, an asset at a predetermined price on a specific future date. In trading, futures allow you to speculate on price movements without owning the underlying asset. Key features include leverage (controlling large positions with smaller capital), ability to profit from both rising and falling markets, and standardized contract specifications. Futures are commonly used for hedging risk and speculation in commodities, currencies, and financial indices."
  },
  {
    question: "Why does the amount of assets after conversion change?",
    answer: "Asset amounts change after conversion due to several factors: exchange rates or conversion rates between different assets, transaction fees and spreads charged by the platform, market volatility during the conversion process, and timing differences between when you initiate and when the conversion completes. Additionally, some platforms may have minimum conversion amounts or apply different rates for different transaction sizes. Always check the conversion rate and fees before completing any asset conversion."
  },
  {
    question: "Why do we need real-name authentication?",
    answer: "Real-name authentication (KYC - Know Your Customer) is required for several important reasons: regulatory compliance with anti-money laundering (AML) laws, preventing fraud and identity theft, ensuring account security and recovery options, meeting licensing requirements for financial services, and protecting both the platform and users from illegal activities. This process typically involves verifying your identity with government-issued documents and helps maintain the integrity of the financial system."
  },
  {
    question: "What is frozen assets?",
    answer: "Frozen assets refer to funds or investments that are temporarily unavailable for trading or withdrawal. This can happen due to: pending transactions or settlements, regulatory investigations, suspicious activity detection, maintenance or technical issues, margin requirements for open positions, or court orders. When assets are frozen, you cannot access or move them until the underlying issue is resolved. The platform should provide clear information about why assets are frozen and expected resolution timeframes."
  },
  {
    question: "What are the rules of futures trading?",
    answer: "Futures trading rules include: margin requirements (initial and maintenance margins), position limits to prevent excessive risk, daily settlement and mark-to-market procedures, delivery specifications for physical contracts, trading hours and session times, tick size and minimum price movements, leverage limitations based on account type and experience, and risk management protocols. Additionally, traders must understand contract specifications, expiration dates, rollover procedures, and the potential for unlimited losses. Always review platform-specific rules and risk disclosures before trading futures."
  }
];

const HelpCenter: FC = () => {
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        {/* <div className="flex items-center mb-8">
          <button className="flex items-center text-gray-300 hover:text-white transition-colors mr-4">
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK
          </button>
        </div> */}

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Title */}
            <div className="px-6 py-6 border-b border-gray-700/50">
              <h1 className="text-3xl font-bold text-white">Help Center</h1>
            </div>

            {/* FAQ Items */}
            <div className="divide-y divide-gray-700/30">
              {faqItems.map((item, index) => (
                <div key={index} className="group">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-medium mr-4 group-hover:bg-green-600 transition-colors">
                        {index + 1}
                      </div>
                      <span className="text-white font-medium text-lg pr-4">
                        {item.question}
                      </span>
                    </div>
                    <div className="text-gray-400 group-hover:text-green-400 transition-colors">
                      {openItems[index] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 ml-12">
                      <div className="bg-gray-800/40 rounded-lg p-4 border-l-4 border-green-500">
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Still need help? Contact our support team
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
