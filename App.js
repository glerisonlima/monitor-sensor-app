import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function App() {

  const [status, setStatus] = useState("fechada")
  const [statusMonitor, setStatusMonitor] = useState(false)

  const handlerMonitorarButton = () => {
    setStatusMonitor(!statusMonitor)
  }

  const verificaSensor = async () => {
    statusMonitor && setInterval(async () => {
      const { data } = await axios.get('http://172.17.9.242')  // endereço de rede local do esp32  
      setStatus(data)
    }, 1000 )
  }

  useEffect(() => {
    verificaSensor()    
  
  },[statusMonitor])

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handlerMonitorarButton}
      >
        <Text style={styles.textoButton}>{statusMonitor ? "Parar Monitoramento" : "Monitorar"}</Text>
      </TouchableOpacity>
      {statusMonitor && (
        <>
          <Text style={styles.texto}>A porta está {status}</Text>
          <Icon 
            name={status == 'aberta' ? 'door-open' : 'door-closed'} 
            size={60} 
            color={status == 'aberta' ? "#900" : "#32BA16"}>              
          </Icon>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#5061d9',
    padding: 10,
    marginBottom: 30,    
  },
  textoButton: {
    color: "#fff"
  },
  texto: {
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 16
  }
});
