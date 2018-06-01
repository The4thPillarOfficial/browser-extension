export default class Prompt {

    constructor(type = '', data = {}, responder = null) {
        this.type = type;
        this.data = data;
        this.responder = responder;
    }

    /**
     * Return route name
     *
     * @returns {string}
     */
    getRouteName() {
        return 'prompt_' + this.type;
    }
}
