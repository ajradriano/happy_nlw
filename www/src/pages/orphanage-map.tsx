import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import '../styles/pages/orphanage-map.css';

import imgMarker from '../assets/images/logo_marker.svg';
import { FiPlus } from 'react-icons/fi';


function OrphanagesMap() {
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
            </Map>
            <Link to="" className="create-orphanage">
                <FiPlus size="32" color="#FFFFFF"/>
            </Link>
        </div>
    )
    
}

export default OrphanagesMap;
