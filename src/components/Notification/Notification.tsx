import './Notification.css'

export const Notification = (props: any) => {
  return (
      <div className='notification'>
        <p>Posts finded by word: {props.word}</p>
      </div>
  )
}