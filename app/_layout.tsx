import { Slot } from 'expo-router';
import { SessionProvider } from '../ctx';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';


export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
