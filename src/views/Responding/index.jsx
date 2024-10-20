import { useSelector, useDispatch } from 'react-redux'
import { decrement, incrementAsync } from '../../store/counter'

export default function Responding(){
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button onClick={() => dispatch(incrementAsync())}>
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