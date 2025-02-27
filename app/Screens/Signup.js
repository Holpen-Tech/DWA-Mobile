import React from "react";
import styled from "styled-components/native";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  StyledFormArea,
  TextLink,
  TextLinkContent,
} from "../../components/styles";

const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const Logo = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  align-self: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #0056b3;
  margin-bottom: 10px;
  text-align: center;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555555;
`;

const Button = styled.TouchableOpacity`
  background-color: #0056b3;
  padding: 15px;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const Label = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #555555;
  align-self: flex-start;
  margin-bottom: 5px;
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: #555555;
  text-align: center;
`;

const FooterLink = styled.Text`
  color: #0056b3;
  text-decoration-line: underline;
`;

export default function SignupScreen({ navigation }) {
  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 20,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Logo source={require("./DWA-logo.png")} />

          <Title>Account Signup</Title>

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log("Form data:", values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <StyledFormArea>
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    onChangeText={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    value={values.fullName}
                    placeholderTextColor="#888888"
                  />

                  <Label>Email Address</Label>
                  <Input
                    placeholder="Enter your Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholderTextColor="#888888"
                  />

                  <Label>Password</Label>
                  <Input
                    placeholder="*****************"
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholderTextColor="#888888"
                  />

                  <Label>Confirm Password</Label>
                  <Input
                    placeholder="*****************"
                    secureTextEntry
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    placeholderTextColor="#888888"
                  />
                </StyledFormArea>

                <Button onPress={handleSubmit}>
                  <ButtonText>Sign Up</ButtonText>
                </Button>
              </>
            )}
          </Formik>

          <FooterText>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <FooterLink>Log In</FooterLink>
            </TouchableOpacity>
          </FooterText>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
}
