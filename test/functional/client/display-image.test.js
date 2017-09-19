import { Main, history } from 'app/main'
import onboardingPng from 'assets/Onboarding-location.png'
import fetchMock from 'fetch-mock'

describe(`Display Image`, function () {
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

  it(`displays the first image by default`, () => {
    expect(this.wrapper.find('.DisplayImage').find('img')).to.have.prop(
      'src',
      onboardingPng
    )
  })
})
