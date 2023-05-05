/** Controlador do componente da barra de navegação do website com links dinâmicos da página para melhor navegação
  - da fetch no arquivo de config de navegação da página
  - captura da string de navegação para usar como identificador de configuração
  */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class NavBarComponent extends Component {
  // gancho do serviço de roteamento, de onde vou extrair a rota atual para o arquivo de config das sessões
  @service router;
  // propriedade responsiva
  @tracked nav_config_data;

  // construtor do componente, inicializa antes da renderização
  constructor() {
    super(...arguments);

    // testing: passou
    // console.log(this.router.currentRouteName, " <= deve ser a rota atual, ignorando qualquer outra info")

    fetch(window.location.origin + '/nav_config.json').then(
      async (nav_config_response) => {
        if (nav_config_response.ok) {
          let data = await nav_config_response.json();
          data = data[this.router.currentRouteName];
          if (data) {
            data = Object.keys(data).map((key) => {
              return { text: key, link: data[key] };
            });
            this.nav_config_data = data;
          } else {
            data = data['index'];
          }
        }
      }
    );
  }
}
