import Snippets from '../Snippets'

let args
let snippets

describe('Snippets', () => {
  beforeEach(() => {
      args = { id: 'GTM-abc123', dataLayerName: 'dataLayer', additionalEvents: {} }
      snippets = Snippets(args)
  })

  it('should use the `id` for the iframe', () => {
    expect(snippets.iframe).toContain('id=GTM-abc123', 1)
  })

  it('no id provided should log a warn', () => {
      console.warn = jest.fn()
      const noIdArgs = { dataLayerName: 'dataLayer', additionalEvents: {} }
      Snippets(noIdArgs)
      expect(console.warn).toBeCalled()
  })
})