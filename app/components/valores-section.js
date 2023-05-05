import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class sessaotopicos extends Component {
  @tracked atual_content;

  @action
  changeContentIndex(index) {
    this.atual_content = this.args.valoresContent[index];
  }

  constructor() {
    super(...arguments);
    this.atual_content = this.args.valoresContent[0];
  }
}
