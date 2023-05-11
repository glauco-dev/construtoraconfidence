import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ObrasRealizadasService extends Service {
  @tracked data = [];

  async load() {
    if (this.data.length !== 0) return this.data;
    let response = await fetch(window.location.origin + '/projetos.json');
    let projects_info_data = await response.json();
    let projects_url =
      window.location.origin + projects_info_data.projects_url_namespace;
    // pegando o endereço real na esfera pública

    const projetos_to_display = projects_info_data.projects.map(
      (project_name) => {
        return projects_url + project_name;
      }
    );

    // criando request de todos os projetos
    return Promise.all(
      projetos_to_display.map(async (project_url) => {
        //montagem de propriedades por requests
        let titulo = project_url.split('/').pop();
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
          titulo,
          featured_image: img_data,
          short_desc,
          desc,
          fotos,
        };
      })
    ).then((data) => (this.data = data));
  }
}
