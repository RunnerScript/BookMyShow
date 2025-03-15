import { Flex, Button, Form, Input, message } from "antd";
import { resetPassword } from "../../api/users";
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { email } = useParams();

    const onFlinish = async (values) => {
        try {
            const response = await resetPassword(email, values);
            if (response.success) {
                message.success(response.message);
                navigate('/login');
            } else {
                message.error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }

    }

    const onFinishFailed = (error) => {
        console.log(error);
    }
    return <>
        <Flex
            justify='center'
            align='center'
            vertical
        >
            <h1>Reset Password</h1>
            <Form
                onFinish={onFlinish}
                onFinishFailed={onFinishFailed}
                initialValues={null}
            >
                <Form.Item
                    name='otp'
                    label='OTP'
                    rules={[{ required: true, message: "OTP  required" }]}
                >
                    <Input type='text' ></Input>
                </Form.Item>
                <Form.Item
                    name='password'
                    label='password'
                    rules={[{ required: true, message: "Password required" }]}
                >
                    <Input type='text' ></Input>
                </Form.Item>

                <Form.Item
                    label={null}>
                    <Button type='primary' shape="round" size='large' className="w-100" htmlType="submit">
                        Reset
                    </Button>
                </Form.Item>

            </Form>
        </Flex>
    </>
}
export default ResetPassword;

