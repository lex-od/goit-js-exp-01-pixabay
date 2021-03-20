import './styles.scss';
import pixApi from './js/pixApi';
import startTpl from './templates/start.hbs';

const refs = {
    galleryList: document.querySelector('#gallery-list'),
};

pixApi.getImagesByQuery({ name: 'ff' }).then(res => {
    refs.galleryList.innerHTML = startTpl(res.hits);
});
