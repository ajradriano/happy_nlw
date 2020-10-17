import React, { ChangeEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import Leaflet, {latLng, LeafletMouseEvent} from 'leaflet';

import { FiPlus } from "react-icons/fi";

import imgMarker from '../assets/images/logo_marker.svg';

import '../styles/pages/create-orphanage.css';
import Sidebar from "../components/sidebar";
import { FormEvent } from "react";
import api from "../services/api";
import { useHistory } from "react-router-dom";

const mapIcon = Leaflet.icon({
  iconUrl: imgMarker,
  iconSize: [32, 42],
  iconAnchor: [16, 32],
  popupAnchor: [158, 20]
})

export default function CreateOrphanage() {

  const history = useHistory();

  const [position, setPosition] = useState({
    lat: 0,
    lng: 0,
  })

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeingHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {

    const {lat, lng} = event.latlng;
    setPosition({
      lat: lat,
      lng: lng
    });
    
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return window.URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { lat, lng } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('lat', String(lat));
    data.append('lng', String(lng));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Item cadastrado com Sucesso! ;)')

    history.push('/app');

  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOXTOKEN}`}
              />

              {position.lat !== 0 && (
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.lat,position.lng]}
                  />
              )}

            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event => setName(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event => setAbout(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages.map(image =>{
                  return (
                    <img key={image} src={image} alt="Previsualização de imagem" />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event => setInstructions(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={event => setOpeingHours(event.target.value)} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" onClick={() => setOpenOnWeekends(true)} className={open_on_weekends ? 'active' : ''}>Sim</button>
                <button type="button" onClick={() => setOpenOnWeekends(false)} className={!open_on_weekends ? 'active' : ''}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
