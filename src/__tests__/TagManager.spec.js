import React from 'react'
import { mount } from 'enzyme'
import TagManager from '../TagManager'

describe('TagManager', () => {
  it('should render tagmanager', () => {
    const wrapper = mount(
      <TagManager gtmId='GTM-abc123' />
    )
    expect(wrapper.find('noscript')).toHaveLength(1)
  })

  it('should render datalayer', () => {
    const dataLayer = {}
    const wrapper = mount(
      <TagManager gtmId='GTM-abc123' dataLayer={dataLayer} />
    )
    expect(wrapper.find('noscript')).toHaveLength(1)
  })
})