import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ObrasRealizadasService extends Service {
  @tracked projetos = [];
  @tracked tags = [];

  constructor() {
    super(...arguments);
    this.get_Projetos().then((data) => {
      this.projetos = data;
    });
    this.get_Tags().then((data) => {
      this.tags = data;
    });
  }

  async get_Projetos() {
    if (this.projetos.length > 0) return this.projetos;

    let response = await fetch(window.location.origin + '/projetos.json');
    let projects_metadata = await response.json();

    let projects_url =
      window.location.origin + projects_metadata.projects_url_namespace;
    // pegando o endereço real na esfera pública

    const projetos_to_display = projects_metadata.projects.map(
      (project_metadata) => ({
        ...project_metadata,
        project_url: projects_url + project_metadata.titulo,
      })
    );

    return Promise.all(
      projetos_to_display.map(async (project_metadata) => {
        //montagem de propriedades por requests
        let project_url = projects_url + project_metadata.titulo;
        let featured_imgGallery_ref = await (
          await fetch(project_url + '/fotos.json')
        ).json();
        let fotos = featured_imgGallery_ref;
        let img_data = await featured_imgGallery_ref[0];
        img_data = img_data
          ? { ...img_data, url: project_url + '/fotos/' + img_data.url }
          : { url: '', desc: '' };
        let short_desc = await (
          await fetch(project_url + '/short_desc.md')
        ).text();
        let desc = await (await fetch(project_url + '/desc.md')).text();
        // ------

        // retornando para a array de promessas o dado ja digerido
        return {
          ...project_metadata,
          featured_image: img_data,
          short_desc,
          desc,
          fotos,
        };
      })
    );
  }

  async get_Tags() {
    if (this.tags.length > 0) return this.tags;

    let response = await fetch(window.location.origin + '/projetos.json');
    let projects_metadata = await response.json();

    this.tags = projects_metadata.tags;
    return projects_metadata.tags;
  }
}
