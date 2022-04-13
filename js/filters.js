const PriceLevels = {
  default: 'any',
  low: 'low',
  middle: 'middle',
  high: 'high',
};

const DEFAULT_VALUE='any';

const checkPriceLevel =(advert, chosenLevel)=> {
  let level =PriceLevels.default;
  if  (advert.offer.price >= 0 && advert.offer.price <10000){
    level = PriceLevels.low;
  }
  else if (advert.offer.price >= 10000 && advert.offer.price <= 50000){
    level =PriceLevels.middle;
  }
  else if (advert.offer.price > 50000 ) {
    level =PriceLevels.high;
  }
  return level===chosenLevel;
};

const checkingFeature =(advert, feature)=>{
  if (advert.offer.features) {
    return advert.offer.features.includes(feature);
  }
  return false;
};


const filterByType =(adverts)=> {
  const housingType=document.querySelector('#housing-type');
  const copiedAdverts=adverts.slice();
  if (housingType.value ===DEFAULT_VALUE) {
    return copiedAdverts;
  }
  else {
    const filteredAdverts= copiedAdverts.filter((advert) =>(advert.offer.type===housingType.value ));
    return filteredAdverts;
  }
};


const filterByPrice =(adverts)=>{
  const housingPrice=document.querySelector('#housing-price');
  const copiedAdverts=adverts.slice();
  if (housingPrice.value === DEFAULT_VALUE){
    return copiedAdverts;
  } else   {
    const chosenLevel=housingPrice.value;
    const filteredAdverts= copiedAdverts.filter((advert)=>checkPriceLevel(advert, chosenLevel));
    return filteredAdverts;
  }
};


const filterByRooms =(adverts)=> {
  const housingRooms=document.querySelector('#housing-rooms');
  const copiedAdverts=adverts.slice();
  if (housingRooms.value ===DEFAULT_VALUE){
    return copiedAdverts;
  } else {
    const filteredAdverts= copiedAdverts.filter((advert) =>(advert.offer.rooms.toString()===housingRooms.value ));
    return filteredAdverts;
  }
};


const filterByGuests =(adverts)=> {
  const housingGuests=document.querySelector('#housing-guests');
  const copiedAdverts=adverts.slice();
  if (housingGuests.value ===DEFAULT_VALUE) {
    return copiedAdverts;
  }
  else {
    const filteredAdverts= copiedAdverts.filter((advert) =>(advert.offer.guests.toString()===housingGuests.value ));
    return filteredAdverts;
  }
};


const filterByFeature =(adverts, feature)=>{
  const filter=document.querySelector(`input[id=filter-${feature}`);
  const copiedAdverts=adverts.slice();
  if (filter.checked) {
    const filteredAdverts= copiedAdverts.filter((advert) =>checkingFeature(advert, feature));
    return filteredAdverts;
  }
  else {
    return copiedAdverts;
  }

};


const compareAdverts = (advertA, advertB) => {
  let rankA=0;
  let rankB=0;
  if (advertA.offer.features && advertB.offer.features) {
    rankA = advertA.offer.features.length;
    rankB = advertB.offer.features.length;
  }
  else if (!advertA.offer.features){
    rankA =0;
  }
  else  if (!advertB.offer.features) {
    rankB =0;
  }
  return rankB - rankA;
};


const completelyFilter =(adverts) =>{
  const copiedAdverts=adverts.slice();
  let filtered= filterByType(copiedAdverts);
  filtered= filterByPrice(filtered);
  filtered =filterByRooms(filtered);
  filtered =filterByGuests(filtered);
  filtered=filterByFeature(filtered, 'wifi');
  filtered=filterByFeature(filtered, 'dishwasher');
  filtered=filterByFeature(filtered, 'parking');
  filtered=filterByFeature(filtered, 'washer');
  filtered=filterByFeature(filtered, 'elevator');
  filtered=filterByFeature(filtered, 'conditioner');
  return filtered;
};

const setFilter =(cb) => {
  const filterForm=document.querySelector('.map__filters');
  filterForm.addEventListener('change', cb);
};


export {setFilter, compareAdverts, completelyFilter};

