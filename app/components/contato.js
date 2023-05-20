import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ContatoForm extends Component {
  @tracked subject = '';
  @tracked message = '';
  @tracked contactName = '';
  @tracked contactEmail = '';

  get disableSubmit() {
    return (
      !this.contactEmail.length ||
      !this.contactName.length ||
      !this.message.length ||
      !this.subject.length
    );
  }

  @action async onSubmit(e) {
    e.preventDefault();
    let { subject, message, contactEmail, contactName } = this;
    const response = await fetch('/.netlify/functions/send-contact-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, message, contactEmail, contactName }),
    });
    if (response.ok) {
      this.contactEmail = '';
      this.contactName = '';
      this.message = '';
      this.subject = '';
      window.alert('Sua mensagem foi enviada!');
      console.log('ok');
    } else {
      window.alert('Um erro ocorreu ao enviar seu contato!')
      console.log('err');
    }
  }
}
