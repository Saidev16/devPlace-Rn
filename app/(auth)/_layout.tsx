import React, { useContext } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tabs.Screen
        name="Login"
        // component={HomeScreen}
        options={{
          title: "Login",
          headerStyle: {
            backgroundColor: "red",
          },
          headerShown: false,
          //   headerLeft: ()=>{

          //   }
        }}
      />

      <Tabs.Screen
        name="Register"
        options={{
          title: "Register",
          headerStyle: {
            display: "none",
          },
          headerShown: true,
          headerShadowVisible: false,
          headerTitleStyle: {
            display: "none",
          },
        }}
      />
    </Tabs>
  );
}