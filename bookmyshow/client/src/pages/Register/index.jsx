import { Form, Button, Typography, Flex, Card, Input, message } from "antd";
import { RegisterUser } from "../../api/users";
const Register = () => {

    const onFinish = async (values) => {
        const response = await RegisterUser(values);
        console.log(response);
        if (response.data.success) {
            message.success("You are registered successfully!, Login to continue");
        } else {
            message.error(response.data.message);
        }
    }
    const onFinishFailed = (errorInfo) => {

    }
    return (
        <Flex
            justify='center'
            style={{ height: "100vh" }}
            align='center'
            vertical
        >
            <Card style={{ padding: 5, maxWidth: 400, width: '100%' }}>
                <Typography.Title level={3}>Register to BookMyShow</Typography.Title>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="name"
                        htmlFor="name"
                        name='name'
                        rules={[{ required: true, message: "Name Required" }]}
                    >
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter Your Name"
                        />
                    </Form.Item>

                    <Form.Item
                        label='email'
                        name='email'
                        htmlFor="email"
                        rules={[{ required: true, message: "Email Required" }]}
                    >
                        <Input
                            id="email"
                            type="text"
                            placeholder="Enter Your Email"
                        />

                    </Form.Item>
                    <Form.Item
                        label='password'
                        name='password'
                        htmlFor="password"
                        rules={[{ required: true, message: "Password Required" }]}
                    >
                        <Input
                            id="password"
                            type="text"
                            placeholder="Enter Your Password"
                        />

                    </Form.Item>
                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>

                </Form>
            </Card>
        </Flex>
    )
}
export default Register;