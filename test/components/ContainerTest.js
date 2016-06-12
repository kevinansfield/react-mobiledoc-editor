import React from 'react';
import Container from '../../src/components/Container';
import Editor from '../../src/components/Editor';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

describe('<Container />', () => {
  it('fires willCreateEditor callback', () => {
    const willCreateEditor = spy();
    mount(<Container willCreateEditor={willCreateEditor} />);

    expect(willCreateEditor).to.have.been.called;
  });

  it('fires didCreateEditor with editor instance', () => {
    const didCreateEditor = spy();
    const wrapper = mount(<Container didCreateEditor={didCreateEditor} />);

    expect(didCreateEditor).to.have.been.calledWith(wrapper.instance().editor);
  });

  it('should pass mobiledoc to editor', () => {
    const doc = {
      version: "0.3.0",
      markups: [],
      atoms: [],
      cards: [],
      sections: [
        [1, "p", [
          [0, [], 0, "Ohai"]
        ]]
      ]
    };

    const wrapper = mount(<Container mobiledoc={doc} />);
    expect(wrapper.instance().editor.mobiledoc).to.equal(doc);
  });

  it('should pass placeholder to editor', () => {
    const wrapper = mount(<Container placeholder="placeholder!"><Editor /></Container>);
    // Editor div is opaque to React and utilities, match on rendered output
    expect(wrapper.html()).to.match(/placeholder="placeholder!"/);
  });

  it('should pass spellcheck to editor');
  it('should pass autofocus to editor');
  it('should pass options to editor');

  it('unmounts editor', () => {
    const wrapper = shallow(<Container />);
    const editor = wrapper.instance().editor;
    spy(editor, 'destroy');
    wrapper.unmount();
    expect(editor.destroy).to.have.been.called;
  });
});
