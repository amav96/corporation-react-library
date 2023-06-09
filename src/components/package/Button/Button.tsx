import { PropsButton } from '@packageTypes'

export function Button(props: PropsButton) {

  const {
      text,
      textColor= 'c-text-black',
      backgroundColor = 'background-white',
      borderColor = 'c-border-black c-border-rounded-l',
      padding = 'c-p-y-3 c-p-x-4',
      customClass = '',
      type = "submit",
      onClick,
      children
  } = props;

  const handleClick = () => {
    if(onClick){
      onClick()
    }
  }

  return (
    <button
    onClick={handleClick}
    className={`${backgroundColor} ${borderColor} ${padding} ${customClass}`}
    type={type} >
        {children && (
          <div className={textColor}>
            {children}
          </div>
        )}
    </button>
  )
}
