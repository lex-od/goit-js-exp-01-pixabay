import queryParams from '../json/queryParams.json';

export default {
    _ENDPOINT: 'https://pixabay.com/api/',
    _API_KEY: '20679339-fea13a2297aa7649e9595d106',

    _getImages(paramsStr) {
        return fetch(`${this._ENDPOINT}?key=${this._API_KEY}${paramsStr}`).then(
            resp => {
                if (resp.ok) {
                    return resp.json();
                }

                throw new Error('request was rejected by server');
            },
        );
    },

    getImagesByQuery({
        name,
        page,
        perPage,
        category,
        type = 'photo',
        orientation = 'horizontal',
    } = {}) {
        let paramsStr = '';

        if (name) {
            paramsStr += `&q=${name}`;
        }

        if (typeof page === 'number' && page >= 1) {
            paramsStr += `&page=${page}`;
        }

        if (typeof perPage === 'number' && perPage >= 3 && perPage <= 200) {
            paramsStr += `&per_page=${perPage}`;
        }

        if (queryParams.CATEGORIES.includes(category)) {
            paramsStr += `&category=${category}`;
        }

        if (queryParams.TYPES.includes(type)) {
            paramsStr += `&image_type=${type}`;
        }

        if (queryParams.ORIENTATIONS.includes(orientation)) {
            paramsStr += `&orientation=${orientation}`;
        }

        console.log(paramsStr);
        return this._getImages(paramsStr);
    },
};
