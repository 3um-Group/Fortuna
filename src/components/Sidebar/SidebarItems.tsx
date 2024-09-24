const SidebarItems: React.FC = () => (
    <>
        <li key="account-activity"><a>Account Activity</a></li>
        <li key="messages"><a>Messages</a></li>
        <li key="change-theme"><a>Change Theme</a></li>
        <li key="connect-wallet"><a className="btn btn-primary">Connect Wallet</a></li>
    </>
);

export default SidebarItems;
