import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import MapMarker from '../images/marker.png';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  lat: number,
  lng: number,
}

export default function OrphanagesMap() {

  const navigation = useNavigation();
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  })

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', {id});
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{ latitude: -23.4576085, longitude: -52.0293475, latitudeDelta: 0.01, longitudeDelta: 0.01}}>

      {
        orphanages.map((orphanage => {
          return (
            <Marker key={orphanage.id} icon={MapMarker} coordinate={{ latitude: orphanage.lat, longitude: orphanage.lng, }}>
              <Callout tooltip onPress={ () => handleNavigateToOrphanageDetails(orphanage.id) }>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>
                    {orphanage.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
          )
        }))
      }

      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
        <RectButton style={styles.createOrphanageButton} onPress={ handleNavigateToCreateOrphanage }>
          <Feather name="plus" size={20} color="#fff"></Feather>
        </RectButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  calloutContainer: {
    width: 180,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255,1)',
    borderRadius: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#0089a5',

  },

  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 16
  },

  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor:'#15c3d6',
    elevation: 3
  },

  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});