import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

interface UserProfile {
    [key: string]: string; 
}

const MyAccount: React.FC = () => {
    const { user } = useAuth0(); 
    const [isEditing, setIsEditing] = useState(false); 
    const initialProfile: UserProfile = {
        email: user?.email || '',
        phone: '+14151110000',  
        city: 'San Francisco, CA', 
        country: 'USA',  
    };

    const [formData, setFormData] = useState<UserProfile>(initialProfile);
    const [phoneError, setPhoneError] = useState<string | null>(null); 

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!validatePhoneNumber(formData.phone)) {
            setPhoneError('Please enter a valid phone number.');
            return;
        }
        setIsEditing(false);
        setPhoneError(null); 
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(initialProfile); 
        setPhoneError(null); 
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Function to validate phone number (basic validation for numeric input)
    const validatePhoneNumber = (phone: string) => {
        const phoneRegex = /^\+?\d{10,15}$/; 
        return phoneRegex.test(phone);
    };

    return (
        <div className="p-6 mt-6 bg-white rounded-3xl shadow-md w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-left text-xl font-semibold">{user?.name}</h1>
                {!isEditing ? (
                    <button
                        onClick={handleEdit}
                        className="bg-indigo-950 text-white px-4 py-2 rounded"
                    >
                        Edit
                    </button>
                ) : (
                    <div className="space-x-4">
                        <button
                            onClick={handleSave}
                            className="bg-indigo-950 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleCancel}
                            className="bg-indigo-950 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <div className="mt-6 space-y-4">
                {Object.keys(formData).map((key) => (
                    key !== 'password' && (
                        <div key={key} className="border-b border-gray-200 pb-2">
                            <p className="text-xs text-gray-500">{key.toUpperCase()}</p>
                            {!isEditing ? (
                                <p className="text-sm font-semibold">{formData[key]}</p>
                            ) : (
                                <input
                                    type={key === 'phone' ? 'tel' : 'text'} 
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            )}
                        </div>
                    )
                ))}
                {isEditing && phoneError && (
                    <p className="text-red-500 text-sm">{phoneError}</p>
                )}
            </div>
        </div>
    );
};

export default MyAccount;
