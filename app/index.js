import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Homepage from "./Screens/Homepage";
import JobBoard from "./Screens/JobBoard";
import survey from "./Screens/survey";
import onboardingFour from "./Screens/onboardingFour";
import onboardingThree from "./Screens/onboardingThree";
import onboardingOne from "./Screens/onboardingOne";
import onboardingTwo from "./Screens/onboardingTwo";

const Stack = createStackNavigator();

// Create AuthContext
export const AuthContext = React.createContext();

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error(e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token) => {
        try {
          await AsyncStorage.setItem('userToken', token);
          dispatch({ type: 'SIGN_IN', token });
        } catch (e) {
          console.error(e);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          dispatch({ type: 'SIGN_OUT' });
        } catch (e) {
          console.error(e);
        }
      },
      signUp: async (token) => {
        try {
          await AsyncStorage.setItem('userToken', token);
          dispatch({ type: 'SIGN_IN', token });
        } catch (e) {
          console.error(e);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {state.userToken == null ? (
          <>
            <Stack.Screen name="onboardingOne" component={onboardingOne} />
            <Stack.Screen name="onboardingTwo" component={onboardingTwo} />
            <Stack.Screen name="onboardingThree" component={onboardingThree} />
            <Stack.Screen name="survey" component={survey} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="JobBoard" component={JobBoard} />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}