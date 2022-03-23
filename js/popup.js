import {
  adjustWordForRooms,
  adjustWordForGuests,
} from './dictionary.js';


const advertList = document.querySelector('#map-canvas');
const advertTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderPopup = ({
  author,
  offer
}) => {
  const advertElement = advertTemplate.cloneNode(true);
  advertElement.querySelector('.popup__title').textContent = offer.title;
  advertElement.querySelector('.popup__text--address').textContent = offer.address;
  advertElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertElement.querySelector('.popup__type').textContent = offer.type;

  advertElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${adjustWordForRooms(offer.rooms)} для ${offer.guests} ${adjustWordForGuests(offer.guests)}`;
  advertElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // advertElement.querySelector('.popup__features').textContent = offer.features;
  const advertFeatures = offer.features.slice();
  const featuresContainer = advertElement.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featuresListItem) => {
    const isNecessary = advertFeatures.some(
      (advertFeature) => featuresListItem.classList.contains(`popup__feature--${advertFeature}`),
    );
    if (!isNecessary) {
      featuresListItem.remove();
    }
  });

  if (offer.description !== '') {
    advertElement.querySelector('.popup__description').textContent = offer.description;
  } else {
    advertElement.querySelector('.popup__description').classList.add('hidden');
  }
  const photos = offer.photos;
  const advertPhotos = advertElement.querySelector('.popup__photo');
  const advertPhotoList = advertElement.querySelector('.popup__photos');
  advertElement.querySelector('.popup__photo').remove();
  for (const photo of photos) {
    const advertPhoto = advertPhotos.cloneNode(false);
    advertPhoto.src = photo;
    advertPhotoList.appendChild(advertPhoto);
  }
  advertElement.querySelector('.popup__avatar').src = author.avatar;
  advertList.appendChild(advertElement);
};


export {
  renderPopup
};
