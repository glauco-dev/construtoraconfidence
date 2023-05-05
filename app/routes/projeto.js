import Route from '@ember/routing/route';

export default class ProjetoRoute extends Route {
  async model(params) {
    const projects_content_config = await (
      await fetch(window.location.origin + '/projetos.json')
    ).json();
    let url =
      window.location.origin +
      projects_content_config.projects_url_namespace +
      params.projeto_id;

    const response = await fetch(url + '/desc.md');
    if (response.ok) {
      return {
        status: true,
        url,
      };
    } else {
      return {
        status: false,
        url,
      };
    }
  }
}
