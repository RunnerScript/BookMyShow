import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
});
const Navbar = () => {
    const navItems = [
        {
            label: "Home",
        },
        {
            label: "Pradeep"
        }
    ]

    return (
        <Layout>
            <Flex
                justify='space-between'
                align='center'
                style={{
                    position: 'sticky',
                    top: 0,
                    width: '100%',
                    color: '#fff',
                    backgroundColor: '#001529',
                    padding: '10px 20px',
                    zIndex: 1000
                }}
            >
                <h3>BookMyShow</h3>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={navItems}
                    style={{
                        backgroundColor: '#001529',
                        borderBottom: 'none',
                        flexGrow: 1, // Ensures it takes full width
                        justifyContent: 'right',
                        overflow: 'visible' // Prevents collapsing into three dots
                    }}
                />
            </Flex>

        </Layout>
    )
}
export default Navbar;