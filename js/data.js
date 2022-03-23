import {
  getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  fillIncludedElementsArray,
  repeatStr,
  createRandomNumbersArray
} from './utils.js';
import {
  getRussianTypeWord,
  getRussianWordEnding
} from './dictionary.js';


const SIMILAR_ADVERTS_COUNT = 10;
const OFFERS_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKINS_CHECKOUTS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const MIN_GUESTS_QTY = 1;
const MAX_GUESTS_QTY = 15;
const MIN_LAT = 0;
const MAX_LAT = 90;
const MIN_LNG = 0;
const MAX_LNG = 180;
const DECIMAL_PRECISION = 5;
const MIN_ROOMS_QTY = 1;
const MAX_ROOMS_QTY = 6;
const LOREM = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ipsum odit corrupti dolores fuga. Earum repellendus ducimus quaerat doloribus ut reiciendis placeat quos, saepe enim ipsa quis, recusandae officiis nihil.';

let serialAvatarPicIndex = 0;
const createAvatarFullPath = () => {
  let avatarPicPath = 'img/avatars/user';
  const randomNumbers = createRandomNumbersArray(SIMILAR_ADVERTS_COUNT);
  const index = randomNumbers[serialAvatarPicIndex];
  if (index <= 9) {
    avatarPicPath += '0';
  }
  const avatarFullPath = `${avatarPicPath}${index}.png`;
  serialAvatarPicIndex++;
  return avatarFullPath;
};

const createAdvert = () => {
  const latitude = getRandomPositiveFloat(MIN_LAT, MAX_LAT, DECIMAL_PRECISION);
  const longitude = getRandomPositiveFloat(MIN_LNG, MAX_LNG, DECIMAL_PRECISION);
  const rooms = getRandomPositiveInteger(MIN_ROOMS_QTY, MAX_ROOMS_QTY);
  const type = getRandomArrayElement(OFFERS_TYPES);
  return {
    author: {
      avatar: createAvatarFullPath(),
    },

    offer: {
      title: `${rooms}-КОМНАТН${getRussianWordEnding(type).toUpperCase()} ${getRussianTypeWord(type).toUpperCase()}`,
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRussianTypeWord(type),
      rooms: rooms,
      guests: getRandomPositiveInteger(MIN_GUESTS_QTY, MAX_GUESTS_QTY),
      checkin: getRandomArrayElement(CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(CHECKINS_CHECKOUTS),
      features: fillIncludedElementsArray(FEATURES),
      description: repeatStr(LOREM, getRandomPositiveInteger(0, 2)),
      photos: fillIncludedElementsArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },

  };

};

const createAdverts = () => Array.from({
  length: SIMILAR_ADVERTS_COUNT
}, createAdvert);

export {
  createAdverts
};
export {
  SIMILAR_ADVERTS_COUNT
};
