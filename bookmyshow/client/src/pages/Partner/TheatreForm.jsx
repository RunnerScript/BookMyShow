import { Modal, Row, Form, Col, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addTheatre, closeModal, updateTheatre } from "../../redux/theatreSlice";
//import { addMovie, updateMovie, deleteMovie } from "../../redux/movieSlice";
//onCancel={handleCancel}

const TheatreForm = () => {
    const { isModalOpen, formType, selectedTheatre } = useSelector((store) => store.theatres);
    const dispatch = useDispatch();

    const onFinishUpdate = async (values) => {
        const response = await dispatch(updateTheatre({ id: selectedTheatre._id, payload: values })).unwrap();
        if (response.success) {
            message.success(response.message);
            dispatch(closeModal());
        }
        else {
            message.error(response.message);
            dispatch(closeModal());
        }
    }

    const onFinishCreate = async (values) => {
        const response = await dispatch(addTheatre(values)).unwrap();
        if (response.success) {
            message.success(response.message);
            dispatch(closeModal());
        } else {
            message.error(response.message);
        }

    }


    return <Modal
        title={formType === 'add' ? "Add Theatre" : "Edit Theatre"}
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
            initialValues={selectedTheatre}
            onFinish={formType === 'add' ? onFinishCreate : onFinishUpdate}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={24}>
                    <Form.Item
                        label='Theatre Name'
                        name='name'
                        rules={[{ required: true, message: "Theatre Name Required" }]}
                    >
                        <Input placeholder="Enter the Theatre Name" />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Address'
                        name='address'
                        rules={[{ required: true, message: "Address  Required" }]}
                    >
                        <Input placeholder='Enter the address' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item
                                label='Phone'
                                name='phone'
                                rules={[{ required: true, message: "Duration Required" }]}
                            >
                                <Input type="Number" placeholder="Enter Phone" />

                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[{ required: true, message: "Language Required" }]}
                            >
                                <Input placeholder='Enter email address' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={24}>
                            <Form.Item
                                label={null}
                            >
                                <Button className="w-100 h-40" type="primary" htmlType="submit" >{formType === 'add' ? "Add Theatre" : "Update Theatre"}</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    </Modal>
}
export default TheatreForm;