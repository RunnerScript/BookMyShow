import { Flex, Row, Col, Card, Button, message } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUserBookings } from '../../redux/bookSlice';
import moment from 'moment';
import Bookings from './Booking';
const Profile = () => {
    return (<>
        <h1>Profile</h1>
        <Bookings />
    </>)

}

export default Profile;