/**
 * JustChat-Web
 *
 * @link https://github.com/brian978/JustChat-Web
 * @copyright Copyright (c) 2014
 * @license Creative Commons Attribution-ShareAlike 3.0
 */
define(["./Lib"], function (Lib) {
    /**
     *
     * @param {jQuery} container
     * @constructor
     */
    Lib.MessageBox = function (container) {
        /**
         *
         * @type {jQuery}
         * @protected
         */
        this.container = container;
    };

    Lib.MessageBox.prototype = {
        /**
         *
         * @param {string} message
         */
        addMessage: function (message) {
            var existing = this.container.html();
            if (existing.length > 0) {
                existing += "<br />";
            }

            this.container.html(existing + message);
            this.container.animate({scrollTop: this.container[0].scrollHeight}, "fast");
        }
    };

    return Lib.MessageBox;
});
