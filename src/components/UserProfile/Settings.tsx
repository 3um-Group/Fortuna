import React, { useState } from 'react';

const Settings: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <div className="p-6 mt-6 bg-white rounded-3xl shadow-md">
            <h1 className="text-xl font-bold">Settings</h1>

            <div className="mt-6">
                <h2 className="font-semibold">Theme Configuration</h2>
                <div className="mt-3">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                            className="w-5 h-5"
                        />
                        <span>Enable Dark Mode</span>
                    </label>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="font-semibold">Notification Settings</h2>
                <div className="mt-3">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={notificationsEnabled}
                            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                            className="w-5 h-5"
                        />
                        <span>Enable Notifications</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Settings;
