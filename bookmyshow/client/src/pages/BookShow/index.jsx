import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { fetchShowById } from '../../redux/bookSlice';
import { Flex, Row, Col, Card, Button, message } from 'antd';
import useSelection from 'antd/es/table/hooks/useSelection';
import { addSeat, removeSeat } from '../../redux/bookSlice';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import { bookingShow, makePaymentApi } from '../../api/booking';
//publish key 
const PUBLISH_KEY = "pk_test_51Ljz7CCSTbwgv1CuvxS28FmsErB5NE9EACJZCKSTv2LvK5fFdnSwFkhZg0WcgNvxeOlecSKf9mtbccjsyF9j8M0z00ZfN9SFKC"

const BookShow = () => {
    const { movieId, showId } = useParams();
    const { selectedShow, selectedSeats, status, error } = useSelector((store) => store.booking);

    const { user } = useSelector((store) => store.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchShowById(showId));
    }, []);


    const totalSeats = selectedShow ? selectedShow.totalSeats : 0;
    const bookedSeats = selectedShow ? selectedShow.bookedSeats : [];

    const handleSelection = (selectedSeats, seat) => {
        if (selectedSeats.find(selected => selected === seat)) {
            dispatch(removeSeat(seat));
        } else {
            dispatch(addSeat(seat));
        }

    }
    const seats = useMemo(() => {
        const seatsArray = [];

        if (selectedShow) {
            for (let i = 1; i <= selectedShow.totalSeats; i++) {
                let seatClass = 'bk-btn';
                let disabled = false;
                if (selectedSeats.find(seat => seat == i)) {
                    seatClass += " selected";
                }

                if (selectedSeats.find(seat => seat == i)) {
                    seatClass += ' selected';
                }
                if (selectedShow.bookedSeats.find(seat => seat == i)) {
                    seatClass += ' booked';
                    disabled = true;
                }
                seatsArray.push(
                    <li key={i} >
                        <button disabled={disabled} onClick={() => handleSelection(selectedSeats, i)} className={seatClass}>
                            {i}
                        </button>

                    </li>
                );


            }
        }
        return seatsArray;
    }, [totalSeats, bookedSeats, selectedSeats]);

    const book = async (transactionId) => {
        const response = await bookingShow({
            show: showId,
            transactionId,
            seats: selectedSeats,
            user: user._id
        });

        if (response.success) {
            message.success(response.message);
        } else {
            message.error(response.message);
        }

    }
    const onToken = async (token) => {
        try {
            const response = await makePaymentApi(token, selectedSeats.length * selectedShow.ticketPrice * 100);
            if (response.success) {
                message.success(response.message);
                const transactionId = response.data;
                book(transactionId);
            }
            else {
                message.error(response.message);
            }
        } catch (error) {
            message.error("Payment error");
        }


    }


    if (status === 'loading' || status === 'idle') {
        return <>Loading...</>
    }
    if (error !== null) {
        return <>Something went wrong, try refreshing the page.</>
    }

    if (!selectedShow) {
        return <>Loading...</>
    }
    console.log("Slectshow", selectedShow);
    return <>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='d-flex justify-content-between px-2'>
            <Col span={{ xs: 24, sm: 24, md: 16, lg: 16 }}>
                <h1>{selectedShow.theatre.name}</h1>
                <p>{selectedShow.theatre.address}</p>
            </Col>
            <Col span={{ xs: 24, sm: 24, md: 8, lg: 8 }}>
                <Card title="Show Details">
                    <p>Date & Time: <b>{moment(selectedShow.date).format('MMM Do YY') + ' at ' + moment(selectedShow.time, "HH:mm").format("hh:mm A")}</b> </p>
                    <p>Show Name: <b>{selectedShow.name}</b></p>
                    <p>Ticket Price: <b>Rs. {selectedShow.ticketPrice}/-</b></p>
                    <p>Total Seats: <b>{selectedShow.totalSeats}</b> | Availabel Seats: <b>{selectedShow.totalSeats - selectedShow.bookedSeats.length}</b></p>
                </Card>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justify-center'>
            <Col span={16} >
                <Card className='text-center my-2' variant="borderless" title={`Book Seats on  ${selectedShow.name} `}>
                    <ul className='ticket-list'>
                        {seats}
                    </ul>
                </Card>
                <Card >
                    <p>Selected seats: <b>{selectedSeats.join(',')}</b></p>
                    <p>Total Price: <b>Rs. {selectedShow.ticketPrice * selectedSeats.length}</b></p>
                    <p>{selectedSeats.length > 0 && (
                        <StripeCheckout
                            token={onToken}
                            billingAddress
                            amount={selectedShow.ticketPrice * selectedSeats.length * 100}
                            currency="INR"
                            stripeKey={PUBLISH_KEY}>
                            <Button type='primary' shape='round' size='large' className='w-100' >Pay Now</Button>

                        </StripeCheckout>
                    )}
                    </p>
                </Card>


            </Col>
        </Row>




    </>
}


export default BookShow;