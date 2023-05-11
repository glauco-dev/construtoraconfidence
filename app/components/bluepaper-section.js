import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class BluePaperSection extends Component {
  @service obrasRealizadas;

  constructor() {
    super(...arguments);
    this.obrasRealizadas.load();
  }
}
