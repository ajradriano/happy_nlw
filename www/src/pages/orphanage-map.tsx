import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanage-map.css';

import imgMarker from '../assets/images/logo_marker.svg';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import api from '../services/api';

interface Orphanage {
  id: number;
  name: string;
  lat: number;
  lng: number;
  // TODO - Pherhaps after.
  // about: string;
  // instructions: string;
  // opening_hours: string;
  // open_on_weekends: boolean;
}

const mapIcon = Leaflet.icon({
	iconUrl: imgMarker,
	iconSize: [32, 42],
	iconAnchor: [16, 32],
	popupAnchor: [158, 20]
})


function OrphanagesMap() {

	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('orphanages').then(response => {
			setOrphanages(response.data);
		})
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={ imgMarker } alt="Map Marker"/>
					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>
				<footer>
					<strong>Paiçandu</strong>
					<span>Paraná</span>
				</footer>
			</aside>
			<Map 
				center={[
					-23.4533905,-52.0321356
				]}
				zoom={15}
				style={{
					width:'100%',
					height:'100%'
				}}>
				<TileLayer 
					url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOXTOKEN}`}
					
				/>
        {
          orphanages.map(orphanage => {
            return (
              <Marker
              icon={mapIcon}
              position={[
                orphanage.lat, orphanage.lng
              ]}
              key={orphanage.id}
            >
              <Popup 
                className="map-popup"
                closeButton={false}
                minWidth={240}
                maxWidth={240}
              >
                { orphanage.name }
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="FFFFFF" />
                </Link>
              </Popup>
            </Marker>
            )
          })
        }
			</Map>
			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size="32" color="#FFFFFF"/>
			</Link>
		</div>
	)
	
}

export default OrphanagesMap;
