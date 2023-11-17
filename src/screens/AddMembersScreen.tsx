// AddMembersScreen.tsx
import React from "react";
import { View, StyleSheet, ImageBackground, Text } from "react-native";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

interface AddMembersScreenProps {}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const AddMembersScreen: React.FC<AddMembersScreenProps> = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  return (
    <>
      <ImageBackground
        source={require("../theme/pngtree-simple-lights-on-black-background-image_556934.jpg")}
        style={styles.background}
      >
        <Text style={styles.title}>Ingresar Integrantes!</Text>
        <Form
          name="dynamic_form_item"
          {...formItemLayoutWithOutLabel}
          onFinish={onFinish}
          style={{ maxWidth: "60%", alignItems: "center" }}
        >
          <Form.List
            name="names"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(
                      new Error("Almenos ingrese 2 integrantes")
                    );
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "" : ""}
                    style={index === 0 ? styles.labelItem : undefined}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Ingrese el integrante o elimine este campo.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Nombre integrante"
                        style={styles.input}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        style={styles.deleteButton}
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <View style={styles.addButtonContainer}>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={styles.addButton}
                      icon={<PlusOutlined />}
                    ></Button>
                  </View>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom:20,
    textAlign: "center",
    alignSelf: "center",
  },
  labelItem: {
    color: "white",
    fontSize: 18, // Ajusta el tamaño de fuente según tus necesidades
  },
  input: {
    width: "60%",
  },
  background: {
    flex: 1,
    // resizeMode: "cover",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  deleteButton: {
    fontSize: 24,
    color: "#999",
    marginLeft: 8,
    cursor: "pointer",
    transition: "color 0.3s",
  },
  addButtonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    
    
  },
  addButton: {
    width: "60%",
    
  },
});

export default AddMembersScreen;
