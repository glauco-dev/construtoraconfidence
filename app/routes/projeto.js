import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ProjetoRoute extends Route {
  @service('obras-realizadas') obras;
  async model(params) {
    let filtered;
    filtered = (await this.obras.get_Projetos()).filter(
      (ob) => ob.titulo === params.projeto_id
    )[0];
    return { data: filtered };
  }
}
