import cx from 'classnames'
import styles from './DisplayImage.module.scss'
import onboardingPng from 'assets/Onboarding-location.png'
import { memoize } from 'ramda'
import { connect } from 'react-redux'
import { setInitialZoom, zoomIn, zoomOut } from 'app/actions'

const getImageZoom = memoize((modifier, zoomLevel) => {
  return (zoomLevel *= (modifier/100)).toFixed(3)
})

@connect(state => ({
  zoomLevel: state.displayImage.zoomLevel,
  modifier: state.displayImage.modifier,
  imageZoom: getImageZoom(
    state.displayImage.modifier,
    state.displayImage.zoomLevel
  ),
}))
export default class HomeRoute extends React.Component {
  render() {
    return (
      <section className='HomeRoute'>
        <div className={styles.controls}>
          Base level: {this.props.zoomLevel}
          <br />
          Modifier: {this.props.modifier}
          <br />
          Image Zoom: {this.props.imageZoom}
          <Controls />
        </div>
        <DisplayImage />
      </section>
    )
  }
}

@connect(state => ({
  modifier: state.displayImage.modifier,
  imageZoom: getImageZoom(
    state.displayImage.modifier,
    state.displayImage.zoomLevel
  ),
}), { zoomIn, zoomOut })
class Controls extends React.Component {
  render() {
    const { modifier, imageZoom, zoomIn, zoomOut } = this.props
    // what if the viewport is less than 50% of the image?!?!!!?!?!
    return (
      <div>
        <button
          className={styles.button}
          disabled={imageZoom >= 1}
          onClick={zoomIn}>
          Zoom In
        </button>
        {' '}
        <button
          className={styles.button}
          disabled={modifier <= 50}
          onClick={zoomOut}>
          Zoom Out
        </button>
      </div>
    )
  }
}

@connect(state => ({
  modifier: state.displayImage.modifier,
}), { setInitialZoom })
class DisplayImage extends React.Component {
  imageRef = node => this.imageNode = node

  getClassName = () =>
    cx('DisplayImage', this.props.className, styles.wrapper)

  render() {
    const { modifier } = this.props
    return (
      <div className={this.getClassName()}>
        <img
          ref={this.imageRef}
          src={onboardingPng}
          alt='onboarding-png'
          className={styles.image}
          style={{ transform: `scale(${modifier/100})` }}
        />
      </div>
    )
  }

  componentDidMount() {
    this.imageNode.addEventListener('load', this.setImage)
    window.addEventListener('resize', this.setImage)
  }

  componentWillUnmount() {
    this.imageNode.removeEventListener('load', this.setImage)
    window.removeEventListener('resize', this.setImage)
  }

  setImage = () => {
    const { naturalWidth } = this.imageNode
    const { width } = this.imageNode.getBoundingClientRect()
    const zoomLevel = width / naturalWidth
    this.props.setInitialZoom(zoomLevel)
  }
}
