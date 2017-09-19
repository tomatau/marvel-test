import DocumentMeta from 'react-helmet'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import App from './App'
import { shallow } from 'enzyme'
import styles from './App.module.scss'

describe('App Component', function () {
  helpers.setupSnapshots(__filename)

  beforeEach(() => {
    this.tree = shallow(<App />)
  })

  it('renders a div tag with className at rootNode', () => {
    expect(this.tree.hasClass(styles.app)).to.eql(true)
  })

  it('renders a Helmet document meta as firtChild', () => {
    const firstChild = this.tree.childAt(0)
    expect(firstChild).to.have.type(DocumentMeta)
  })

  it('renders HeadNavigation as second child', () => {
    const secondChild = this.tree.childAt(1)
    expect(secondChild).to.have.type(HeadNavigation)
  })

  it('renders a h1 as third child', () => {
    const thirdChild = this.tree.childAt(2)
    expect(thirdChild).to.have.type('h1')
  })

  it('renders a main.content as fourth child', () => {
    const fourthChild = this.tree.childAt(3)
    expect(fourthChild).to.have.type('main')
    expect(fourthChild).to.have.className(styles.content)
  })

  describe('DocumentMeta', () => {
    it('sets the meta options', () => {
      expect(this.tree.find(DocumentMeta).node).to.eql(
        <DocumentMeta
          defaultTitle='Marvel Test'
          titleTemplate='%s | Marvel Test'>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content='Marvel Test, a minimal boilerplate for building universal react applications' />
          <meta name='keywords' content='react,redux,react-router,koa,universal,babel,es7,hmr,webpack' />
        </DocumentMeta>
      )
    })
  })

  describe('Title', () => {
    it('should have "Marvel Test" as text child', () => {
      const title = this.tree.find('h1')
      expect(title.text()).to.contain('Marvel Test')
    })
  })

  describe('Main', () => {
    it('renders routes inside Main', () => {
      expect(
        snap(this.tree.find('main'))
      ).to.matchSnapshot()
    })
  })
})
