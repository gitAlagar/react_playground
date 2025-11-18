import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch} from './store';
import { incrementAsync, decrementAsync, reset } from './counterSlice';
import { selectCount } from './counterSlice';

export const Counter = () => {

    // const count = useSelector((state:RootState) => state.counter.value);
    const count = useSelector(selectCount);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            <h1>{count}</h1>
            <button className='button' type='button' onClick={() => dispatch(incrementAsync())}>increase</button>
            <button className='button' type='button' onClick={() => dispatch(decrementAsync())}>decrease</button>
            <button className='button' type='button' onClick={() => dispatch(reset())}>reset</button>
        </div>
    )
};