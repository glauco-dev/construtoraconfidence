import Route from '@ember/routing/route';

export default class AboutRoute extends Route {
  async model() {
    const response = await fetch(
      window.location.origin + '/assets/content/about.md'
    );
    const data = await response.text();
    return data;
  }
}
