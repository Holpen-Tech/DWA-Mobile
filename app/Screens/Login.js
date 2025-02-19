import React, { useContext, useState } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";

import styled from "styled-components/native";

import { Formik } from "formik";

import {
  StyledContainer,
  InnerConetainer,
  StyledFormArea,
  TextLink,
  TextLinkContent,
} from "../../components/styles";

import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

import { AuthContext } from "../index";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// API client
import axios from "axios";

// Styled Components
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
`;

const Logo = styled.Image`
  width: 100px; /* Adjust the width to your desired size */
  height: 100px; /* Adjust the height to your desired size */
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #0056b3;
  margin-bottom: 10px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #777777;
  margin-bottom: 30px;
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

const RememberMeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Checkbox = styled.View`
  width: 20px;
  height: 20px;
  border: 2px solid #28a745;
  border-radius: 3px;
  margin-right: 10px;
`;

const RememberMeText = styled.Text`
  font-size: 14px;
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
  align-self: flex-start; /* Aligns the text to the left */
  margin-bottom: 5px; /* Adds spacing between the label and input */
`;

const FooterText = styled.Text`
  font-size: 14px;
  color: #555555;
`;

const FooterLink = styled.Text`
  color: #0056b3;
  text-decoration-line: underline;
`;

const LanguageSelector = styled.Text`
  font-size: 14px;
  color: #b22222;
  margin-top: 30px;
`;

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleLogin = async (values) => {
    try {
      console.log('Attempting login...');
      
      const response = await api.auth.login({
        email: values.email,
        password: values.password
      });
      console.log('Login response:', response);
  
      if (rememberMe) {
        await AsyncStorage.setItem('rememberMe', 'true');
      }
  
      await signIn(response.token);
      navigation.navigate('Homepage');
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      alert(error.response?.data?.error || error.message || 'Login failed. Please check your network connection.');
    }
  };
  
  return (
    <Container>
      <Logo source={require("./DWA-logo.png")} />

      <Title>Get back in</Title>
      <Text>OR</Text>
      <TextLink onPress={() => navigation.navigate("Signup")}>
        <TextLinkContent>Join DWA</TextLinkContent>
      </TextLink>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <StyledFormArea>
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
            </StyledFormArea>

            <RememberMeContainer>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <Checkbox style={rememberMe ? {backgroundColor: '#28a745'} : {}} />
              </TouchableOpacity>
              <RememberMeText>Remember Me</RememberMeText>
            </RememberMeContainer>

            <Button onPress={handleSubmit}>
              <ButtonText>Log In</ButtonText>
            </Button>
          </>
        )}
      </Formik>

      <FooterText>
        Lost your password? <FooterLink>Reset Password</FooterLink>
      </FooterText>

      <LanguageSelector>🌐 English (United States)</LanguageSelector>
    </Container>
  );
}
