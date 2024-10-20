import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/counter'

export default function Responsing(){
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>Responding view: {count}</span>
        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  )
}