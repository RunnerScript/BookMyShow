import { Modal, Row, Form, Col, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, updateMovieById } from "../../api/movies";
import { addShow, modifyShow, closeModal, fetchShowsByTheatre } from "../../redux/showSlice";
//import { addMovie, updateMovie, deleteMovie } from "../../redux/movieSlice";
//onCancel={handleCancel}
const ShowForm = ({ theatreId }) => {
    const { isModalOpen, formType, selectedShow } = useSelector((store) => store.shows);
    const dispatch = useDispatch();
    const { list: movies } = useSelector((store) => store.movies);



    const showData = selectedShow
        ? { ...selectedShow, date: moment(selectedShow.date).format('YYYY-MM-DD') }
        : {};

    const onFinishUpdate = async (values) => {
        const payload = { showId: selectedShow._id, show: values, theatre: theatreId };
        const response = await dispatch(modifyShow(payload)).unwrap();
        if (response.success) {
            message.success(response.message);
            dispatch(closeModal());
        } else {
            message.success(response.message);
            dispatch(closeModal());
        }
    }

    const onFinishCreate = async (values) => {

        const payload = { ...values, theatre: theatreId }
        const response = await dispatch(addShow(payload)).unwrap();

        if (response.success) {
            message.success(response.message);
            dispatch(closeModal());
        } else {
            message.success(response.message);
            dispatch(closeModal());
        }

    }

    return <Modal
        title={formType === 'add' ? "Add Show" : "Edit Show"}
        open={isModalOpen}
        onOk={() => console.log("ok")}
        onCancel={() => dispatch(closeModal())}

        footer={[
            <Button key='cancel' className="w-100 h-40" onClick={() => dispatch(closeModal())}>
                Cancel
            </Button>
        ]}
    >
        <Form
            layout='vertical'
            initialValues={{ ...showData, movie: showData.movie?._id }}
            onFinish={formType === 'add' ? onFinishCreate : onFinishUpdate}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Show Name'
                        name='name'
                        rules={[{ required: true, message: "Show Name Required" }]}
                    >
                        <Input placeholder="Enter the Show Name" />
                    </Form.Item>
                </Col>
                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Show Date'
                        name='date'
                        rules={[{ required: true, message: "Show Date Required" }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Show Time'
                        name='time'
                        rules={[{ required: true, message: "Time Required" }]}
                    >
                        <Input type="text" placeholder="Enter Time in format HH:MM" />

                    </Form.Item>
                </Col>

                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Movie'
                        name='movie'
                        rules={[{ required: true, message: "Language Required" }]}
                    >
                        <Select
                            placeholder="Select Movie"
                            options={movies.map(movie => {
                                return { value: movie._id, label: movie.movieName };
                            })}
                        />

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Total Seats'
                        name='totalSeats'
                        className='m-0'
                        rules={[{ required: true, message: "Total seats Required" }]}
                    >
                        <Input type="Number" />

                    </Form.Item>
                </Col>
                <Col span={{ xs: 24, sm: 24, md: 12, lg: 12 }}>
                    <Form.Item
                        label='Ticket Price'
                        name='ticketPrice'
                        rules={[{ required: true, message: "Ticket Price Required" }]}
                    >
                        <Input type="Number" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Form.Item
                        label={null}
                    >
                        <Button className="w-100 h-40" type="primary" htmlType="submit" >Save Show</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </Modal>
}
export default ShowForm;