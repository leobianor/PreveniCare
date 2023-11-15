import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import Menu from './screens/Menu';
import CadastroPacientesScreen from './screens/CadastroPacientesScreen';
import CadastroMedicamentosScreen from './screens/CadastroMedicamentosScreen';
import AcompanhamentoScreen from './screens/AcompanhamentoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Login} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="CadastroPacientes" component={CadastroPacientesScreen} />
          <Stack.Screen name="CadastroMedicamentos" component={CadastroMedicamentosScreen} />
          <Stack.Screen name="Acompanhamento" component={AcompanhamentoScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
