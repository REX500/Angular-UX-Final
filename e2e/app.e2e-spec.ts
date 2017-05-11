import { Ng2testproPage } from './app.po';

describe('ng2testpro App', function() {
  let page: Ng2testproPage;

  beforeEach(() => {
    page = new Ng2testproPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
