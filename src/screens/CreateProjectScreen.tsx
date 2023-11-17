import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { ImageBackground, StyleSheet } from "react-native";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values: any) => {
  console.log(values);
};

const CreateProjectScreen: React.FC = () => (
  <ImageBackground
    source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
    style={styles.background}
  >
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['user', 'name']}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input
          style={{ backgroundColor: '#474747', color: 'white', borderRadius: 10, borderWidth: 0, borderColor: 'transparent' }}
          placeholder="Enter your name"
        />
      </Form.Item>

      <Form.Item
        name={['user', 'introduction']}
        label="Introduction"
      >
        <Input.TextArea
          style={{ backgroundColor: '#474747', color: 'white' ,borderRadius: 10, borderWidth: 0, borderColor: 'transparent'}}
          placeholder="Enter your introduction"
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default CreateProjectScreen;
