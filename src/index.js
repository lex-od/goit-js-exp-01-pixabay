import * as Handlebars from 'handlebars/runtime';

import './styles.scss';
import pixApi from './js/pixApi';
import startTpl from './templates/start.hbs';

const refs = {
    galleryList: document.querySelector('#gallery-list'),
};

Handlebars.registerHelper('dyn-likes', function (likesCount) {
    let classNum = Math.floor(likesCount / 20);
    classNum = classNum > 10 ? 10 : classNum;

    console.log(likesCount, classNum);
    return classNum;
});

Init();

function Init() {
    pixApi.setStartSearchParams({
        name: 'cat',
        page: 1,
        perPage: 100,
        type: 'photo',
        orientation: 'horizontal',
    });

    pixApi.searchNextPage().then(result => {
        refs.galleryList.innerHTML = startTpl(result.hits);
    });
}
