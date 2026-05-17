import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer , DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import TabNavigator from "./src/navigation/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional: to wait for auth check

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#020617", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
      <NavigationContainer >  
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            // User is logged in
            <>
            {/* Bottom Tabs */}
            <Stack.Screen name="Tabs" component={TabNavigator} />
            </>
          ) : (
            // User is not logged in
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
  );
}