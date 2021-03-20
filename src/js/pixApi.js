import queryParams from '../json/queryParams.json';

export default {
    _ENDPOINT: 'https://pixabay.com/api/',
    _API_KEY: '20679339-fea13a2297aa7649e9595d106',

    isLastPage: false, // Только для чтения
    currParams: { page: 0, perPage: 20 }, // Только для чтения

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
        type,
        orientation,
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

        return this._getImages(paramsStr);
    },

    setStartSearchParams(paramsObj = {}) {
        let { page, perPage } = paramsObj;

        page = typeof page === 'number' && page >= 0 ? page : 0;
        perPage =
            typeof perPage === 'number' && perPage >= 3 && perPage <= 200
                ? perPage
                : 20;

        this.currParams = { ...paramsObj, page, perPage };
        this.isLastPage = false;
    },

    searchNextPage() {
        if (this.isLastPage) {
            return Promise.reject(new Error('unavailable page requested'));
        }

        this.currParams.page++;

        return this.getImagesByQuery(this.currParams).then(result => {
            this._updateLastPage(result.totalHits);

            return result;
        });
    },

    _updateLastPage(maxCount) {
        const totalCount = this.currParams.page * this.currParams.perPage;
        this.isLastPage = totalCount >= maxCount;
    },
};
