import DocumentMeta from 'react-helmet'
import { Switch, Route } from 'react-router-dom'
import HeadNavigation from 'app/components/HeadNavigation/HeadNavigation'
import CodeSplit from 'app/components/CodeSplit'
// example s?css module import
import style from './App.module.scss'

const log = debug('App.js')

export default class App extends React.Component {
  render() {
    log('render')
    return (
      <div className={style.app}>
        <DocumentMeta
          defaultTitle='Marvel Test'
          titleTemplate='%s | Marvel Test'>
          <html lang='en' />
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width,initial-scale=1.0' />
          <meta name='description' content='Marvel Test, a minimal boilerplate for building universal react applications' />
          <meta name='keywords' content='react,redux,react-router,koa,universal,babel,es7,hmr,webpack' />
        </DocumentMeta>
        <HeadNavigation />
        <h1>Marvel Test</h1>
        <main className={style.content}>
          <Switch>
            <CodeSplitRoute
              exact
              path='/'
              load={() => import('app/routes/HomeRoute/HomeRoute')}
            />
            <CodeSplitRoute
              load={() => import('app/routes/NotFoundRoute/NotFoundRoute')}
            />
          </Switch>
        </main>
      </div>
    )
  }
}

const CodeSplitRoute = ({ load, ...props }) => (
  <Route {...props}
    render={() => (
      <CodeSplit load={load}>
        {(Comp) => Comp && <Comp />}
      </CodeSplit>
    )}
  />
)
