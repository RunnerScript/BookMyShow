import { Form, Input, Checkbox, Button, Flex, Card, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../../api/users";
const Login = () => {
    const onFinish = async (values) => {

        const response = await LoginUser(values);
        if (response.data.success) {
            message.success("Successfully LoggedIn!");
        } else {
            message.error(response.data.message);
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
    }
    return (
        <>
            <header className="header"></header>
            <Flex
                style={{ height: '100vh' }}
                justify='center'
                align='center'
                vertical
            >
                <Card style={{ padding: 24, maxWidth: 400, width: "100%" }}>
                    <Typography.Title level={3}>Login to BookMyShow</Typography.Title>

                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{
                            remember: true,
                        }}
                        style={{ width: 300 }}
                    >
                        <Form.Item
                            label='Email'
                            htmlFor='email'
                            name='email'
                            className='d-block'
                            rules={[{ required: true, message: "Email Required" }]}
                        >
                            <Input
                                id='email'
                                type='text'
                                placeholder='Enter your Email'
                            />
                        </Form.Item>

                        <Form.Item
                            label='password'
                            htmlFor='password'
                            name='password'
                            className="d-block"
                            rules={[{ required: true, message: "Password Required" }]}
                        >
                            <Input
                                type='text'
                                id='password'
                            />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>

                    <Typography.Paragraph>New User ? Click here to <Link to="/register"> Register </Link> </Typography.Paragraph>
                </Card>
            </Flex>
        </>
    )
}
export default Login;