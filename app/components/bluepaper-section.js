import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class BluePaperSection extends Component {
  @tracked projetos_to_display;
  constructor() {
    super(...arguments);
    Promise.all(
      this.args.projetos_to_display.map(async (project_url) => {
        let titulo = project_url.split('/').pop();
        let featured_img_ref = await (
          await fetch(project_url + '/fotos documentativas.json')
        ).json();

        let img_data = await featured_img_ref[0];
        img_data = { ...img_data, url: project_url + '/fotos/' + img_data.url };
        return {
          titulo,
          featured_image: img_data,
          desc: await (await fetch(project_url + '/desc.md')).text(),
        };
      })
    ).then((data) => {
      this.projetos_to_display = data;
    });
  }
}
