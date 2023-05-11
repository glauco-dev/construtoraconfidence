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

  // hook para angulo de rotação do menu em css
  @tracked dropdowncontrolRotation;

  OPENED_MOBILE_MENU_ANGLE = '-180deg';
  CLOSED_MOBILE_MENU_ANGLE = '0deg';

  // construtor do componente, inicializa antes da renderização
  constructor() {
    super(...arguments);

    let checkWindowScrollY = () => {
      setNavBarOpacity(window.pageYOffset > this.args.fadePoint);
    };

    let setNavBarOpacity = (OnOff) => {
      $('#navbar').css('opacity', OnOff ? '1' : '0');
    };
    window.addEventListener('scroll', checkWindowScrollY);
    checkWindowScrollY();

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

  changeMenuShown = () => {
    this.dropdowncontrolRotation =
      this.dropdowncontrolRotation == this.OPENED_MOBILE_MENU_ANGLE
        ? this.CLOSED_MOBILE_MENU_ANGLE
        : this.OPENED_MOBILE_MENU_ANGLE;
    $('#navbar .collapsable-item').css(
      'transform',
      this.dropdowncontrolRotation == this.OPENED_MOBILE_MENU_ANGLE
        ? 'scaleY(1)'
        : 'scaleY(0)'
    );
  };
}
