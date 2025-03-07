import React from 'react';
import { Tabs } from 'antd';
import MovieList from '../Admin/MovieList';
const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Movies',
        children: <MovieList />,
    },
    {
        key: '2',
        label: 'Theatre',
        children: <h1>Theatre Data</h1>,
    },

];
const Dashboard = () => <Tabs type="card" className='d-flex   m-2 flex-col' defaultActiveKey="1" items={items} onChange={onChange} />;
export default Dashboard;