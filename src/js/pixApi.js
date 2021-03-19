export default {
    _ENDPOINT: 'https://pixabay.com/api/',
    _API_KEY: '20679339-fea13a2297aa7649e9595d106',

    _getImages(paramsStr) {
        return fetch(`${this._ENDPOINT}?key=${this._API_KEY}${paramsStr}`).then(
            resp => {
                if (resp.ok) {
                    return response.json();
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
    },
};
