import { useState } from 'react';
import Sidebar2 from '../../cryptowallet2/SideBar2';
// import { FaExternalLinkSquareAlt } from "react-icons/fa";

type Plan = 'monthly' | 'annual';

const plans: Record<Plan, { label: string; price: string; savings?: string }> = {
  monthly: { label: 'Monthly', price: '€19.99/month' },
  annual: { label: 'Annual', price: '€179.99/year', savings: 'Save €59.89' },
};

const features = [
  { title: 'Zero trading fees', description: 'Trade up to €10K monthly with zero trading fees. A spread may apply.' },
  { title: '24/7 priority support', description: 'Call our dedicated team any time, even on holidays and weekends.' },
  { title: 'Boosted staking rewards', description: 'Get increased rates of up to 16.14% APY on staking assets.' },
  { title: 'Analytics via Messari', description: 'Exclusive 90-day free trial to Messari+ Lite.' },
  { title: 'Onchain benefits', description: 'Explore what’s possible onchain with Base, Arbitrum, Morpho, and more. See all.' },
];

const faqs = [
  { question: 'Is Crypto Serbia worth it?', answer: 'Crypto Serbia offers valuable benefits for active traders...' },
  { question: 'How do I pay for Crypto Serbia?', answer: 'You can pay using PayPal, credit/debit card, or crypto balance.' },
];

export default function Community() {
  const [selected, setSelected] = useState<Plan>('monthly');
  const { price, savings } = plans[selected];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <Sidebar2 />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 flex flex-col lg:flex-row gap-6">
        {/* Subscription Card */}
        <div className="bg-green-300 rounded-2xl shadow-lg p-10 text-gray-900 flex-shrink-0 w-full md:w-2/5 lg:w-1/3 flex flex-col justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold mb-4">Join Crypto Serbia for zero trading fees</h1>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mb-6">
              <button
                className={`px-4 py-2 rounded-full border ${selected === 'monthly' ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'}`}
                onClick={() => setSelected('monthly')}
              >
                {plans.monthly.label}
              </button>
              <button
                className={`px-4 py-2 rounded-full border ${selected === 'annual' ? 'bg-blue-600 text-white' : 'border-gray-300 text-gray-700'}`}
                onClick={() => setSelected('annual')}
              >
                {plans.annual.label}
              </button>
            </div>
            <div className="mb-6">
              <span className="text-2xl md:text-3xl font-bold">{price}</span>
              {savings && <span className="block md:inline text-sm text-green-600 md:ml-2">{savings}</span>}
            </div>
            <p className="text-sm text-gray-600 mb-6">
              By clicking "Join now", you agree to our terms & authorise a monthly charge to any stored payment method until canceled.
            </p>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 bg-gray-100 rounded-lg text-gray-700 font-medium">PayPal</button>
            <button className="flex-1 py-3 bg-blue-600 rounded-lg text-white font-medium">Join now</button>
          </div>
        </div>

        {/* Features & FAQ */}
        <div className="flex-1 flex flex-col gap-6">
          <section className="bg-green-300 rounded-2xl shadow-lg p-6 text-gray-900">
            <ul className="space-y-4">
              {features.map((f) => (
                <li key={f.title}>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-600">{f.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-green-300 rounded-2xl shadow-lg p-6 text-gray-900">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              {faqs.map((q) => (
                <details key={q.question} className="border-b border-gray-200 pb-2">
                  <summary className="cursor-pointer font-medium">{q.question}</summary>
                  <p className="text-sm text-gray-600 mt-2">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
