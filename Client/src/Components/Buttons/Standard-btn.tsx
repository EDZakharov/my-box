import style from './Standard-btn.module.scss'
type props = {
  tittle: string
  fontSize: number
  width: number
  height: number
  onButtonClick: any
  onButtonClickParams?: {}
  preventDefaulted?: boolean
}

/** This is a React function component.
 ** Required props:
 *  @param {number} width number [px]
 *  @param {number} height number [px]
 *  @param {number} fontSize number [px]
 *  @param {string} tittle string
 ** Optional props:
 *  @param {any | undefined} onButtonClick - onClick
 *  @param {{} | undefined} onButtonClickParams - onClickParams
 *  @param {boolean} preventDefaulted - boolean - e.preventDefault()
 */
export const StandardButton = ({
  onButtonClick,
  onButtonClickParams,
  width,
  height,
  fontSize,
  tittle,
  preventDefaulted,
}: props): JSX.Element => {
  return (
    <button
      onClick={(e) => {
        preventDefaulted && e.preventDefault()
        onButtonClick(onButtonClickParams)
      }}
      className={style.standard__button}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontSize: `${fontSize}px`,
      }}
    >
      {tittle}
    </button>
  )
}
