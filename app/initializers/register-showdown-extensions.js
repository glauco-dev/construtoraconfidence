import showdown from 'showdown';

export function initialize() {
  showdown.extension('tableClass', function () {
    return [
      {
        type: 'html',
        regex: '<table>',
        replace: '<table  class="ui  celled table">',
      },
    ];
  });
}

export default {
  name: 'register-showdown-extensions',
  initialize,
};
