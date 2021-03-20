import './styles.scss';
import pixApi from './js/pixApi';
import startTpl from './templates/start.hbs';

const refs = {
    galleryList: document.querySelector('#gallery-list'),
};

Init();

function Init() {
    pixApi.setStartSearchParams({
        name: 'microsoft',
        type: 'photo',
        orientation: 'horizontal',
    });

    pixApi.searchNextPage().then(res => {
        refs.galleryList.innerHTML = startTpl(res.hits);
    });
}
