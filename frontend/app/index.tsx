
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Button } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

import { Link } from 'expo-router';
import { router } from 'expo-router';

import { useSession } from '../ctx';

export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const { signIn } = useSession();

  const handleLogin = async () => {

    setLoading(true)

    try {

      const res = await signIn({ email, password });

      if (!res.success) {
        // Handle error scenario
        setErrorMessage('Login failed. Please check your credentials.');
        setLoading(false);
        return;
      }
      setLoading(false)
      router.replace('/(app)');

    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setLoading(false);
    }


  }


  if (loading) {
    return (< ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://originbluy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foriginbluy-logo.6a29982c.png&w=3840&q=75' }}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}><ThemedText type='subtitle'>Loading...</ThemedText></ThemedView>
    </ParallaxScrollView>)
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{ uri: 'https://originbluy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foriginbluy-logo.6a29982c.png&w=3840&q=75' }}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>


        <View style={styles.container}>
          <ThemedText type='title'>Welcome Back!</ThemedText>


          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize={'none'}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />


          {errorMessage ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={!email || !password}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Don't have an account?</Text>

            <Link href="/register">
              <Text style={styles.loginButton}>Register</Text>
            </Link>

          </View>
        </View>
      </ThemedView>



    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 188,
    width: 220,
    bottom: 0,
    left: 80,
    position: 'absolute',
    resizeMode: 'contain'
  },
  loginTextContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: 250
  },
  loginText: {
    color: '#333333',
    fontSize: 16,
  },
  loginButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  errorContainer: {
    width: '80%',
    backgroundColor: '#f8d7da',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: '#721c24',
    fontSize: 14,
    textAlign: 'center',
  },
});
