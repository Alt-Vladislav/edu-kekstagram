import { genRandomInteger, flipCoin, getRandomArrayElement, getUnicRandomArrayElement } from '../util.js';

const COMMENTS_NUMBER_MAX = 30;
const COMMENTS_NUMBER_ID_MAX = 300;
const COMMENTS_AVATAR_NUMBER_MIN = 1;
const COMMENTS_AVATAR_NUMBER_MAX = 6;
const LIKES_NUMBER_MIN = 15;
const LIKES_NUMBER_MAX = 200;

const POST_DESCRIPTIONS = [
  'Сейчас я дома уже',
  'Взял нож - режь, взял дошик - ешь',
  'Я живу, как карта ляжет. Ты живёшь, как мамка скажет',
  'Никогда не сдавайтесь, идите к своей цели! А если будет сложно – сдавайтесь.',
  'Запомни: всего одна ошибка – и ты ошибся',
  'В жизни всегда есть две дороги: одна — первая, а другая — вторая',
  'Делай, как надо. Как не надо, не делай',
  'Работа — это не волк. Работа — ворк. А волк — это ходить.',
  'Жи-ши пиши от души'
];
const COMMENTS_CONTENT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const COMMENTATOR_NICKNAMES = [
  'Джейсон',
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Люпита',
  'Вашингтон',
];


const generateComment = (allowedIdArray) => function () {
  let commentText = '';

  if (flipCoin()) {
    commentText = getRandomArrayElement(COMMENTS_CONTENT);
  } else {
    const getRandomComment = getUnicRandomArrayElement(COMMENTS_CONTENT.slice());
    commentText = `${getRandomComment()}\n${getRandomComment()}`;
  }
  const genUniqId = getUnicRandomArrayElement(allowedIdArray);

  return {
    id: genUniqId(),
    avatar: `img/avatar-${genRandomInteger(COMMENTS_AVATAR_NUMBER_MIN, COMMENTS_AVATAR_NUMBER_MAX)}.svg`,
    message: commentText,
    name: getRandomArrayElement(COMMENTATOR_NICKNAMES)
  };
};


const generatePost = () => {
  let indexPost = 0;

  return () => {
    indexPost++;

    const allowedIdArray = Array.from({ length: COMMENTS_NUMBER_ID_MAX }, (_, index) => ++index);
    const genComment = generateComment(allowedIdArray);

    return {
      id: indexPost,
      url: `photos/${indexPost}.jpg`,
      description: getRandomArrayElement(POST_DESCRIPTIONS),
      likes: genRandomInteger(LIKES_NUMBER_MIN, LIKES_NUMBER_MAX),
      comments: Array.from({ length: genRandomInteger(0, COMMENTS_NUMBER_MAX) }, genComment)
    };
  };
};


let generatedArray = [];
const genNewPost = generatePost();

const generatePosts = (postsNumber) => {
  generatedArray = generatedArray.concat(Array.from({ length: postsNumber }, genNewPost));
};

const getGeneratedPosts = () => generatedArray;

export { generatePosts, getGeneratedPosts };
