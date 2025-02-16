import { useSelector } from 'react-redux'
import type { RootState } from '../../app/store'
import { Alcohol } from './Alcohol'
import { Cost } from './Cost'
import { DistanceMarkers } from './DistanceMarker'
import { HappyHours } from './HappyHours'
import { Hours } from './Hours'
import { VibeLabels } from './VibeLabels'
import menu from '../../assets/menu.svg'
import mapGif from '../../assets/area-map.gif'
import {BarChart} from './BarChart'
import { DoughnutChart } from './DoughnutChart'

export const DetailModal = () => {
  const { activeRestaurant } = useSelector(
    (state: RootState) => state.restaurants
  )

  function hasBooze() {
    if (activeRestaurant.alcoholic) {
      return 'Yes'
    } else {
      return 'No'
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontFamily: 'LEMONMILK-Italic' }} className="mb-3">
        {activeRestaurant.name}
      </h1>
      <p style={{ letterSpacing: '.5rem' }} className="card-text">
        <img
          style={{
            width: '3rem',
            marginBottom: '1rem',
            marginRight: '.5rem',
          }}
          src={mapGif}
          alt="map icon"
        />
        <span style={{ letterSpacing: '.3rem' }}>
          {activeRestaurant.address}
        </span>
      </p>
      <hr className="mt-1 mb-6" />
      <figure className="figure">
        {/* <img
          src={activeRestaurant.coverImg}
          alt={activeRestaurant.alt}
          className="figure-img img-fluid rounded"
        /> */}

        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={activeRestaurant.coverImg} className="d-block w-100 figure-img img-fluid rounded" alt={activeRestaurant.alt} />
            </div>
            <div className="carousel-item">
              <img src={activeRestaurant.photo[0].url} className="d-block w-100 figure-img img-fluid rounded" alt={activeRestaurant.photo[0]["alt_text"]} />
            </div>
            <div className="carousel-item">
              <img src={activeRestaurant.photo[1].url} className="d-block w-100 figure-img img-fluid rounded" alt={activeRestaurant.photo[1]["alt_text"]} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </figure>
      <hr className="mt-1 mb-6" />
      <div style={{ margin: '1rem' }}>
        <DistanceMarkers userDistance={activeRestaurant.userDistance} />
      </div>
      <hr className="mt-1 mb-6" />
      <div className="d-flex flex-column align-items-justify">
        <p
          style={{ letterSpacing: '.5rem', textAlign: 'center' }}
          className="card-text small-text"
        >
          <span style={{ letterSpacing: '.3rem' }}>
            <span>
              <img
                style={{
                  width: '2.7rem',
                  marginRight: '.5rem',
                }}
                src={menu}
                alt="menu icon"
              />
            </span>
            Food Type: {activeRestaurant.foodType}
          </span>
        </p>
        <hr className="mt-1 mb-6" />
        <Alcohol alcohol={hasBooze()} />
        <hr className="mt-1 mb-6" />
        <Cost cost={activeRestaurant.cost} />
        <hr className="mt-1 mb-6" />
      </div>
      <Hours restaurant={activeRestaurant} />

      {activeRestaurant.happyHours ? (
        <HappyHours />
      ) : (
        <div className="m-4 label grey" role="alert">
          😔 No Specials Available
        </div>
      )}
      <hr className="mt-1 mb-6" />
      <p
        style={{
          letterSpacing: '.5rem',
          textAlign: 'center',
          fontSize: '1.2rem',
        }}
        className="card-text small-text"
      >
        Rating & Vibes
      </p>
      <BarChart ratings={activeRestaurant.ratingDist}/>
      <DoughnutChart vibes={activeRestaurant.vibes}/>
    </div>
  )
}
