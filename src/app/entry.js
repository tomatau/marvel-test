import ReactDOM from 'react-dom'
import socket from 'app/composition/socket'
import { Main } from 'app/main'

debug.enable(process.env.DEBUG)

const log = debug('entry')

log(`Running in [${process.env.NODE_ENV}] environment`)
log('Environment', process.env)

socket.open()

ReactDOM.render(
  Main, document.getElementById('app-container')
)
