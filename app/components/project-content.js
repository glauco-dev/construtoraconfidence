import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ProjectContentComponent extends Component {
  @tracked road_map_content;
  @tracked desc;
  @tracked fotos_documentativas = [{ url: '', desc: '' }];
  @tracked fotos = [];
  @tracked wrapper_coluns_layout = '';
  @tracked titulo = '';
  @tracked capa = '';
  @tracked yPos = '0px';

  constructor() {
    super(...arguments);
    fetch(this.args.content_source + '/roadmap.md').then(async (data) => {
      if (data.ok) {
        this.road_map_content = await data.text();
      }
    });
    fetch(this.args.content_source + '/desc.md').then(async (data) => {
      if (data.ok) {
        this.desc = await data.text();
      }
    });
    fetch(this.args.content_source + '/fotos documentativas.json').then(
      async (data) => {
        if (data.ok) {
          this.fotos_documentativas = (await data.json()).map((el) => ({
            url: this.args.content_source + '/fotos/' + el.url,
            desc: el.desc,
          }));
        }
      }
    );
    fetch(this.args.content_source + '/fotos.json').then(async (data) => {
      if (data.ok) {
        this.fotos = (await data.json()).map(
          (el) => this.args.content_source + '/fotos/' + el
        );
        this.capa = this.fotos[0];
      }
    });

    this.titulo = this.args.content_source.split('/').pop();

    document.addEventListener('scroll', (e) => {
      this.yPos = '-' + window.scrollY / 4 + 'px';
    });
  }
}
