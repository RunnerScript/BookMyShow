import { Form, Button, Typography, Flex, Card, Input } from "antd";
const Register = () => {

    const onFinish = (values) => {

    }
    const onFinishFailed = (errorInfo) => {

    }
    return (
        <Flex
            style={{ height: "100vh" }}
            justify='center'
            align='center'
            vertical
        >
            <Card style={{ padding: 5, maxWidth: 400, width: '100%' }}>
                <Typography.Title>Register to BookMyShow</Typography.Title>
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
                        label='User ID'
                        name='userid'
                        htmlFor='userid'
                        rules={[{ required: true, message: "User ID Required" }]}
                    >
                        <Input
                            id="userid"
                            type="text"
                            placeholder="Enter User ID"
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