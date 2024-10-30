import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaPlus, FaMinus } from 'react-icons/fa';

interface FAQItemProps {
    question: string;
    answer: string;
    icon?: 'default' | 'alternate';
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, icon = 'default' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const IconComponent = isOpen
        ? icon === 'default'
            ? FaChevronUp
            : FaMinus
        : icon === 'default'
        ? FaChevronDown
        : FaPlus;

    return (
        <div>
            <button
                onClick={toggleDropdown}
                className="w-full text-left p-3 bg-gray-100 rounded-md flex justify-between items-center"
            >
                <span className="font-semibold">{question}</span>
                <IconComponent />
            </button>
            {isOpen && <p className="mt-2 p-3 bg-gray-50 rounded-md">{answer}</p>}
        </div>
    );
};

interface HelpCenterProps {
    icon?: 'default' | 'alternate';
    showContactInfo?: boolean;
}

const HelpCenter: React.FC<HelpCenterProps> = ({
    icon = 'default',
    showContactInfo = true,
}) => {
    const faqs = [
        {
            question: 'How do I update my profile?',
            answer: 'Go to the My Account section to update your information.',
        },
        {
            question: 'How do I add a new credit card?',
            answer: 'Visit the Card Management section to add or manage your credit cards.',
        },
    ];

    return (
        <div className="p-6 mt-6 bg-white rounded-3xl shadow-md">
            <h1 className="text-xl font-bold">Help Center</h1>
            <div className="mt-6">
                <h2 className="font-semibold">Frequently Asked Questions</h2>
                <ul className="mt-4 space-y-4">
                    {faqs.map((faq, index) => (
                        <li key={index}>
                            <FAQItem question={faq.question} answer={faq.answer} icon={icon} />
                        </li>
                    ))}
                </ul>

                {/* Conditionally render the "Contact Us" section based on A/B test */}
                {showContactInfo && (
                    <div className="mt-8">
                        <h2 className="font-semibold">Contact Us</h2>
                        <p>Email: support@yourapp.com</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpCenter;
