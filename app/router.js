import EmberRouter from '@ember/routing/router';
import config from 'construtoraconfidence/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('projetos');
  this.route('projeto', { path: '/projeto/:projeto_id' });
  this.route('about');
  this.route('contato');
  this.route('todasobras');
});
