import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TodasobrasController extends Controller {
  @tracked tags = [0];

  constructor() {
    super(...arguments);
  }

  // ação de adicionar e remover da array de tags filtradas, essa
  @action
  toggleTag(tag) {
    // se for a tag "todas", limpar imediatamente
    if (tag == 0) this.tags = [0];

    // identificar index da tag no parametro, se possível
    let found = this.tags.indexOf(tag);

    // se achar, remover tornando-o nulo, caso contrário, concatenar a array de tags com ele junto
    if (found > -1) this.tags[found] = null;
    else this.tags = this.tags.concat([tag]);

    // criar uma nova array com a array filtrada de elementos nulos
    this.tags = this.tags.filter((tag) => tag !== null);
  }

  @action
  isTagSelected(tag) {
    if (tag !== 0) return this.tags.includes(tag) ? 'item active' : 'item';
    else return this.tags.length == 0 ? 'item active' : 'item';
  }

  get tags() {
    return this.tags;
  }

  get allTags() {
    return this.model.data.tags;
  }

  get projetos() {
    // função responsável por retornar os projetos filtrados pelas tags
    if (this.tags.includes(0) && this.tags.length === 1)
      return this.model.data.projetos;

    return this.model.data.projetos.filter((obra) =>
      this.tags.reduce((acc, curr) => obra.tags.includes(curr) && acc, true)
    );
  }
}
