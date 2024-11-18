import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Settings({ navigation }) {
  // Add logout functionality, for example
  const handleLogout = () => {
    // Logic for logging out (clear token or user data)
    console.log('User logged out');
    // You can also use a context or redux to manage authentication state
    navigation.navigate('Login'); // Redirect to Login screen after logging out
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.option}>
        <Text style={styles.optionText}>Change Password</Text>
        <Button title="Go to Change Password" onPress={() => console.log('Navigating to change password screen')} />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Manage Notifications</Text>
        <Button title="Manage Notifications" onPress={() => console.log('Managing notifications')} />
      </View>

      <View style={styles.option}>
        <Text style={styles.optionText}>Language</Text>
        <Button title="Change Language" onPress={() => console.log('Changing language')} />
      </View>

      {/* Logout Button */}
      <View style={styles.option}>
        <Button title="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
