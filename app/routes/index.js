import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  async model() {
    const response = await fetch(window.location.origin + '/projetos.json');
    const projects_info_data = await response.json();

    let projects_url =
      window.location.origin + projects_info_data.projects_url_namespace;

    const projetos_to_display = projects_info_data.projects.map(
      (project_name) => {
        return projects_url + project_name;
      }
    );

    let valores_url = window.location.origin + '/assets/content/values.json';
    const valoresContent = await (await fetch(valores_url)).json();

    return { projetos_to_display, valoresContent };
  }
}
