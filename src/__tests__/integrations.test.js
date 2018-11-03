import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [
      { name: 'Fecthed #1' },
      { name: 'Fetched #2' }
    ],
  });
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall();
});

it('can fetch a list of comments', (done) => {
  // find the fetchComments button and click it
  wrapped.find('.fetch-comments').simulate('click');

  // expect to see list of comments!
  moxios.wait(() => {
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
  });
});