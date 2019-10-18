import {
    createAutoComplete,
} from '../../auto-complete/index';
import data from './cities.json';
import {
    debounce,
    chunk,
} from './utils';

export default class AutoCompleteUi {
    constructor() {
        this.autoComplete = createAutoComplete(data);
        this.containerMarkup = '<div class="container-wrapper headen"><ul class="elements-list"></ul></div>';
        this.input = '<input class="input" placeholder="Input here">';
        this.container = null;
        this.containerWrapperHeight = null;
        this.containerWrapper = null;
        this.searchResults = [];
    }

    initUi() {
        const bodyElement = document.querySelector('body');
        bodyElement.insertAdjacentHTML('beforeend', this.input);
        bodyElement.insertAdjacentHTML('beforeend', this.containerMarkup);
        this.container = document.querySelector('.elements-list');
        const containerWrapper = document.querySelector('.container-wrapper');
        this.containerWrapperHeight = containerWrapper.clientHeight;
        this.containerWrapper = document.querySelector('.container-wrapper');
    }

    getListOfItems(searchArray) {
        if (!searchArray) return [];
        return searchArray.reduce((acc, element) => `${acc}<li class="single-element">${element}</li>`, '');
    }

    clearTextContent() {
        this.container.innerHTML = '';
    }

    inputHandler(event) {
        if (!event[0].target.classList.contains('input')) return;
        if (event[0].target.value) {
            this.containerWrapper.classList.remove('headen');
        } else {
            this.containerWrapper.classList.add('headen');
        }
        const substring = event[0].target.value;

        this.clearTextContent();
        this.searchResults = chunk(this.autoComplete(substring), 100);
        this.containerWrapper.scrollTop = 0;
        this.insertElements();
    }

    handleInput() {
        document.body.addEventListener('input', debounce(this.inputHandler.bind(this), 200));
    }

    containerScrollHandler() {
        const containerScrollTop = this.containerWrapper.scrollTop;
        const containerScrollHeight = this.containerWrapper.scrollHeight;
        if (containerScrollHeight - (containerScrollTop + this.containerWrapperHeight) === 0) {
            this.insertElements();
        }
    }

    handleContainerScroll() {
        this.containerWrapper.addEventListener('scroll', debounce(this.containerScrollHandler.bind(this), 450));
    }

    insertElements() {
        if (!this.searchResults) return;
        this.container.insertAdjacentHTML('beforeend', this.getListOfItems(this.searchResults[0]));
        this.searchResults.shift();
    }
}
