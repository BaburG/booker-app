import { router } from "expo-router";
import { Text } from "react-native-paper";
import {
  Button,
  ButtonText,
  Input,
  InputField,
  VStack,
  FormControl,
  Heading,
  InputSlot,
  InputIcon,
  Box,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    try {
      setError(null); // Reset error state before attempting sign in
      const response = await signIn(username, password);
      console.log("Sign-in successful, navigating to home.");
      router.replace("/"); // Navigate to the home page
      } catch (error) {
        console.error("Sign-in failed:", error);
        setError(
          "Failed to sign in. Please check your network connection and try again."
        );
      }
  };

  const handleState = () => {
    setShowPassword((showState) => !showState);
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <FormControl
        p="$4"
        borderWidth="$1"
        borderRadius="$lg"
        borderColor="$borderLight300"
        $dark-borderWidth="$1"
        $dark-borderRadius="$lg"
        $dark-borderColor="$borderDark800"
        width="85%"
      >
        <VStack space="xl">
          <Heading color="$text900" lineHeight="$md">
            Login
          </Heading>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Email
            </Text>
            <Input isInvalid={!!error}>
              <InputField
                type="text"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text color="$text500" lineHeight="$xs">
              Password
            </Text>
            <Input textAlign="center" isInvalid={!!error}>
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={setPassword}
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$darkBlue500"
                />
              </InputSlot>
            </Input>
          </VStack>
          {error && (
            <Box mt="$2">
              <Text style={{ color: 'red', fontSize: 14 }}>{error}</Text>
            </Box>
          )}
          <Button ml="auto" onPress={handleSignIn} disabled={!isFormValid}>
            <ButtonText color="$white">Save</ButtonText>
          </Button>
        </VStack>
      </FormControl>
    </SafeAreaView>
  );
}
