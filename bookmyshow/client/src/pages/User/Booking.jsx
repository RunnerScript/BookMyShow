import { Flex, Row, Col, Card, Button, message, Meta } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookings } from '../../redux/bookSlice';
import moment from 'moment';

const Bookings = () => {
    console.log("are you working here");
    const { user } = useSelector((store) => store.users);
    const { userBookings, bookingStatus, bookingError } = useSelector((store) => store.booking);
    const dispatch = useDispatch();
    const { Meta } = Card;
    //const {bookings}
    useEffect(() => {
        console.log("are you working here")
        dispatch(fetchUserBookings(user._id));
    }, []);

    if (bookingStatus === 'idle' || bookingStatus === 'idle') {
        return <>Loading....</>
    }
    if (bookingStatus === 'failed') {
        return <>Error Loading Bookings</>
    }
    console.log(userBookings);
    return (
        <>
            <h1>My Bookings</h1>
            <Flex justify='center' align='center' gap={20} className='flex-wrap'>
                {
                    userBookings.length > 0 && userBookings.map((booking) => {
                        return (

                            <Card
                                hoverable
                                style={{ width: 200 }}
                                cover={<img src={booking?.show?.movie?.poster} />}
                            >
                                <Meta title={booking?.show?.name}>


                                </Meta>
                                <h1>{booking?.show?.movie?.moviename}</h1>
                                <p>Theatre: <b>{booking?.show?.theatre?.name}</b></p>
                                <p>Seats: <b>{booking?.seats.join(',')}</b></p>
                                <p>Date & Time: <b>{moment(booking.show.date).format('MMM Do YY') + ' at ' + moment(booking.show.time, "HH:mm").format("hh:mm A")}</b> </p>
                            </Card>


                        );
                    })

                }


            </Flex>
        </>
    )
}

export default Bookings;