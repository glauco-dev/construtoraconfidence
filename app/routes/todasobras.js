import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class TodasobrasRoute extends Route {
  @service('obras-realizadas') obras;
  async model() {
    let projetos = await this.obras.get_Projetos();
    let tags = await this.obras.get_Tags();

    return {
      data: {
        tags,
        projetos: projetos.map((obra) => ({
          ...obra,
          firstPhoto: obra.fotos[0],
          secondPhoto: obra.fotos[1],
        })),
      },
    };
  }
}
