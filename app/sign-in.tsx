import { router } from 'expo-router';
import { View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import React, { useState } from 'react';

import { useSession } from '../ctx';

export default function SignIn() {
  const { signIn } = useSession();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      setError(null); // Reset error state before attempting sign in
      await signIn(username, password);
      console.log('Sign-in successful, navigating to home.');
      router.replace('/'); // This should trigger the navigation
    } catch (err) {
      console.error('Sign-in failed:', err);
      setError('Failed to sign in. Please check your network connection and try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={{ width: 200, marginBottom: 10 } }
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: 200, marginBottom: 10 }}
      />
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <Button mode="outlined" onPress={handleSignIn}> Sign in </Button>
    </View>
  );
}
