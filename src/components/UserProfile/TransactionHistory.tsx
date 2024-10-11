import React from 'react';

const transactionData = [
    {
        id: 'TXN123456',
        date: '08-08-2024',
        amount: '$100.00',
        status: 'Completed',
    },
    {
        id: 'TXN654321',
        date: '05-21-2024',
        amount: '$250.50',
        status: 'Pending',
    },
    {
        id: 'TXN789012',
        date: '03-23-2024',
        amount: '$150.25',
        status: 'Failed',
    },
];

const TransactionHistory: React.FC = () => {
    return (
        <div className="p-6 mt-6 bg-white rounded-3xl shadow-md w-full">
            <h1 className="text-2xl font-semibold mb-6">Transaction History</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Transaction ID</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Amount</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactionData.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-200">
                                <td className="py-3 px-4 text-sm text-gray-800">{transaction.id}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{transaction.date}</td>
                                <td className="py-3 px-4 text-sm text-gray-800">{transaction.amount}</td>
                                <td className={`py-3 px-4 text-sm ${getStatusColor(transaction.status)}`}>
                                    {transaction.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Utility function to determine the text color based on transaction status
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Completed':
            return 'text-green-600';
        case 'Pending':
            return 'text-yellow-500';
        case 'Failed':
            return 'text-red-600';
        default:
            return 'text-gray-800';
    }
};

export default TransactionHistory;
