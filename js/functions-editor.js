const sliderConfig = {
  none: {
    settings: undefined,
    getFilterValue: () => ''
  },
  chrome: {
    settings: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
    getFilterValue: (value) => `grayscale(${value})`
  },
  sepia: {
    settings: {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.1,
    },
    getFilterValue: (value) => `sepia(${value})`
  },
  marvin: {
    settings: {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
    },
    getFilterValue: (value) => `invert(${value}%)`
  },
  phobos: {
    settings: {
      range: { min: 0, max: 3 },
      start: 3,
      step: 0.1,
    },
    getFilterValue: (value) => `blur(${value}px)`
  },
  heat: {
    settings: {
      range: { min: 1, max: 3 },
      start: 3,
      step: 0.1,
    },
    getFilterValue: (value) => `brightness(${value})`
  }
};

let imageElement;
let sliderElement;
let sliderWrapperElement;
let valueInputElement;
let currentEffect = 'none';
let valueSlider = 0;

const changeZoom = (imageNode, inputNode, value) => {
  imageNode.style.transform = `scale(${value / 100})`;
  inputNode.value = `${value}%`;
};


const initEffect = (imageLink, sliderWrapperLink, sliderLink, valueInputLink) => {
  imageElement = imageLink;
  sliderWrapperElement = sliderWrapperLink;
  sliderElement = sliderLink;
  valueInputElement = valueInputLink;
};

const setEffect = (effectName) => {
  currentEffect = effectName;

  if (currentEffect === 'none') {
    valueInputElement.value = '';
    sliderWrapperElement.classList.add('hidden');
    imageElement.style.filter = sliderConfig['none'].getFilterValue();
  } else {
    sliderElement.noUiSlider.updateOptions(sliderConfig[currentEffect].settings);
    sliderWrapperElement.classList.remove('hidden');
  }
};

const updateEffectIntensity = () => {
  if (sliderElement !== undefined) {
    valueSlider = sliderElement.noUiSlider.get();

    imageElement.style.filter = sliderConfig[currentEffect].getFilterValue(valueSlider);
    if (currentEffect !== 'none') {
      valueInputElement.value = valueSlider;
    }
  }
};


export{ changeZoom, initEffect, setEffect, updateEffectIntensity };
