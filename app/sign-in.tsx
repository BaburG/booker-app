import { router } from "expo-router";
import { View } from "react-native";
import { Text, TextInput} from "react-native-paper";
import { Button,
   ButtonText,
    Input,
     InputField,
      HStack,
      VStack,
       FormControl,
      Heading,
      InputSlot,
      InputIcon,
      FormControlError,
      FormControlErrorIcon,
      FormControlErrorText,
      AlertCircleIcon,
      } from '@gluestack-ui/themed';
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useSession } from "../ctx";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null); // Reset error state before attempting sign in
      await signIn(username, password);
      console.log("Sign-in successful, navigating to home.");
      router.replace("/"); // This should trigger the navigation
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError(
        "Failed to sign in. Please check your network connection and try again."
      );
    }
  };
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  return (
    <SafeAreaView style={{flex:1, justifyContent: "center", alignItems: "center"}}>
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
          <Input isInvalid={error ? true : false}>
            <InputField type="text" autoCapitalize="none" value={username} onChangeText={setUsername}/>
          </Input>
        </VStack>
        <VStack space="xs">
          <Text color="$text500" lineHeight="$xs">
            Password
          </Text>
          <Input textAlign="center" isInvalid={error ? true : false}>
            <InputField type={showPassword ? "text" : "password"} value={password} onChangeText={setPassword}/>
            <InputSlot pr="$3" onPress={handleState}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                color="$darkBlue500"
              />
            </InputSlot>
          </Input>
        </VStack>
        {error && 
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText> Invalid username or password</FormControlErrorText>
          </FormControlError>}
        <Button
          ml="auto"
          onPress={handleSignIn}
        >
          <ButtonText color="$white">Save</ButtonText>
        </Button>
      </VStack>
    </FormControl>
    </SafeAreaView>
  );
}
