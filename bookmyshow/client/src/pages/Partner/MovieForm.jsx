import { Modal, Row, Form, Col, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMovie, updateMovieById } from "../../api/movies";
import { closeModal, dateFormat } from "../../redux/movieSlice";
import { addMovie, updateMovie, deleteMovie } from "../../redux/movieSlice";
//onCancel={handleCancel}
const MovieForm = () => {
    const { isModalOpen, formType, selectedMovie } = useSelector((store) => store.movies);
    const dispatch = useDispatch();
    const movieData = selectedMovie
        ? { ...selectedMovie, releaseDate: moment(selectedMovie.releaseDate).format('YYYY-MM-DD') }
        : {};


    const onFinishUpdate = async (values) => {
        const response = await dispatch(updateMovie({ id: selectedMovie._id, payload: values })).unwrap();
        if (response.success) {
            message.success(response.message);
            dispatch(closeModal());
        }
        else {
            message.error(response.message);
        }
    }

    const onFinishCreate = async (values) => {
        const response = await dispatch(addMovie(values)).unwrap();
        if (response.success) {
            dispatch(closeModal());
        } else {
            console.log(response);
        }

    }

    return <Modal
        title={formType === 'add' ? "Add Movie" : "Edit Movie"}
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
            initialValues={movieData}
            onFinish={formType === 'add' ? onFinishCreate : onFinishUpdate}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Form.Item
                        label='Movie Name'
                        name='movieName'
                        rules={[{ required: true, message: "Movie Name Required" }]}
                    >
                        <Input placeholder="Enter the Movie Name" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Movie Description'
                        name='description'
                        rules={[{ required: true, message: "Movie Name Required" }]}
                    >
                        <TextArea rows={4} placeholder='Enter the description' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={8}>
                            <Form.Item
                                label='Duration'
                                name='duration'
                                rules={[{ required: true, message: "Duration Required" }]}
                            >
                                <Input type="Number" placeholder="Enter Duration" />

                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Language'
                                name='language'
                                rules={[{ required: true, message: "Language Required" }]}
                            >
                                <Select
                                    placeholder="Select Language"
                                    options={[
                                        { value: "English", label: "English" },
                                        { value: "Hindi", label: "Hindi" },
                                        { value: "Punjabi", label: "Punjabi" },
                                        { value: "Telugu", label: "Telugu" },
                                        { value: "German", label: "German" },
                                    ]}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label='Release Date'
                                name='releaseDate'
                                className='m-0'
                                rules={[{ required: true, message: "Date Required" }]}
                            >
                                <Input type="date" />

                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={8}>
                            <Form.Item
                                label='Genre'
                                name='genre'
                                rules={[{ required: true, message: "Language Required" }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Select Genre"
                                    options={[
                                        { value: "Action", label: "Action" },
                                        { value: "Comedy", label: "Comedy" },
                                        { value: "Romantic", label: "Romantic" },
                                        { value: "Thriller", label: "Thriller" },
                                        { value: "Fiction", label: "Fiction" },
                                        { value: "Sci-Fi", label: "Sci-Fi" },
                                    ]}
                                />

                            </Form.Item>
                        </Col>
                        <Col span={16}>
                            <Form.Item
                                label='Poster'
                                name='poster'
                                rules={[{ required: true, message: "Poster url required" }]}
                            >
                                <Input type='text' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <Form.Item
                                label={null}
                            >
                                <Button className="w-100 h-40" type="primary" htmlType="submit" >Save Movie</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    </Modal>
}
export default MovieForm;