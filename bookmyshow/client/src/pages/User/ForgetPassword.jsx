import { Flex, Button, Form, Input, message } from "antd";
import { forgetPassword } from "../../api/users";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
const ForgetPassword = () => {


    const navigate = useNavigate();

    const onFlinish = async (values) => {
        try {
            const response = await forgetPassword(values);
            if (response.success) {
                message.success(response.message);
                navigate(`/reset/${encodeURIComponent(values.email)}`);
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
            <h1>Forget Password</h1>
            <Form
                onFinish={onFlinish}
                onFinishFailed={onFinishFailed}
                initialValues={null}
            >
                <Form.Item
                    name='email'
                    label='email'
                    rules={[{ required: true, message: "Email required" }]}
                >
                    <Input type='text' placeholder="Enter Email Address" ></Input>
                </Form.Item>

                <Form.Item
                    label={null}>
                    <Button shape="round" size='large' className="w-100" htmlType="submit">
                        Send OTP
                    </Button>
                </Form.Item>

            </Form>
        </Flex>
    </>
}
export default ForgetPassword;

