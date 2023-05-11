// arquivo de rota que tem responsabiliade de:
/*
  passar para o serviço de store da página os dados dos assets de obras existentes
 */
import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    let valores_url = window.location.origin + '/assets/content/values.json';

    return {
      valoresContent: await (await fetch(valores_url)).json(),
    };
  }
}
