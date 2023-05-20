// arquivo de rota que tem responsabilidade de:
/*
  passar para o serviço de store da página os dados dos assets de obras existentes
 */
import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service('obras-realizadas') obras;

  async model() {
    let valores_url = window.location.origin + '/assets/content/values.json';
    return {
      valoresContent: await (await fetch(valores_url)).json(),
      obrasDestaque: (await this.obras.get_Projetos()).slice(0, 3),
      apresentativo: await (
        await fetch('/assets/content/apresentação.md')
      ).text(),
    };
  }
}
