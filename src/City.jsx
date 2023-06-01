import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Modal, Button } from 'react-bootstrap'

function City() {

    const [cities, setCities] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [districts, setDistricts] = useState([])
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        async function getCities() {
            var response = await axios.get("https://turkiyeapi.cyclic.app/api/v1/provinces/");
            setCities(response.data.data)
        }
        getCities()
    }, [])


    function openModal(districts) {
        setDistricts(Array.from(districts))
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    return (
        <div className='card-container'>
            {cities.map((city) => (
                <div className='card mt-4' d-flex justify-content-between style={{ width: 400 }} key={city.id}>
                    <div className='card-header'> {city.name} </div>
                    <div className='card-body'>
                        <p>Bölge: {city.region.tr} </p>
                        <p>Nüfus  {city.population} </p>
                        <p>Metropol mü? {city.isMetropolitan ? "Evet" : "Hayır"}   </p>
                        <p>Enlem {city.coordinates.latitude} Boylam {city.coordinates.longitude}  </p>
                    </div>
                    <div className='card-footer'>
                        <p>
                            <a href={city.maps.googleMaps}>Google mapste inceleyin</a>
                        </p>
                        <p>
                            <a href={city.maps.openStreetMap}>OpenStreet mapste inceleyin</a>
                        </p>

                        <button onClick={() => {
                            openModal(city.districts)
                            setSelectedCity(city.name)
                        }} className='btn btn-primary'>İlçeleri Görüntüle</button>
                    </div>
                </div>
            ))}

            <Modal show={isModalOpen} onHide={closeModal}>
                <Modal.Header className='modal-header-with-custom-close'>
                    <Modal.Title> {selectedCity}  </Modal.Title>

                    <button className="custom-close-button" onClick={closeModal}>
                        <span className="close-icon">x</span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <h5>İlçeler:</h5>
                    <ul>
                        {districts.map((ilce) => (
                            <li key={ilce.id}>{ilce.name} - Nüfus: {ilce.population}  </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Kapat</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

}

export default City