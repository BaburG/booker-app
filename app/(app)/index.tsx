import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSession } from '../../ctx';

export default function Index() {
  const { signOut, getSessionId } = useSession();
  const sessionId = getSessionId(); // Get the session ID

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>session id: {sessionId}</Text>
      <Button
        mode='contained-tonal'
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Button>
    </View>
  );
}
