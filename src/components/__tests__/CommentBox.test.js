import { mount } from 'enzyme';

import React from 'react';
import CommentBox from 'components/CommentBox';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it('has a a textarea and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('textarea test', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: {
        value: 'new comment',
      }
    });
    wrapped.update(); // force update the component
  });

  it('has a textarea that user can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });
  
  it('has empty textarea when submitted', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
})

