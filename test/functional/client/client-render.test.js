import { Main, history } from 'app/main'
import fetchMock from 'fetch-mock'

describe(`Client Render`, function () {
  before(() => {
    history.push('/')
  })

  beforeEach((done) => {
    this.wrapper = mount(Main)
    defer(done)
  })

  afterEach(() => {
    this.wrapper.unmount()
    fetchMock.restore()
  })

  it(`sets the page title`, () => {
    expect(document.title).to.eql('Marvel Test')
  })

  it(`sets the meta description and chartset`, () => {
    const metaCharset = document.querySelector('meta[charset]')
    expect(metaCharset.getAttribute('charset')).to.eql('utf-8')
    const metaDesc = document.querySelector('meta[name=description]')
    expect(metaDesc.getAttribute('content')).to.contain('Marvel Test')
  })

  it(`only renders the HomeRoute`, () => {
    expect(this.wrapper.find('.HomeRoute')).to.be.present()
    expect(this.wrapper.find('.NotFoundRoute')).not.to.be.present()
  })

  describe(`Routes`, () => {
    describe(`404`, () => {
      beforeEach((done) => {
        history.push('/no-match-found')
        defer(done)
      })

      it(`renders the 404 route when no match found`, () => {
        expect(this.wrapper.find('.NotFoundRoute')).to.be.present()
      })
    })
  })
})
