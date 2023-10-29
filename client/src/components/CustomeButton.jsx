import { useSnapshot } from 'valtio';
import state from '../store/index';
import {getContrastingColor} from '../config/helpers.js';

const CustomeButton = ({type, title, customeStyles, handleOnClick}) => {
    const snap = useSnapshot(state);
    const generateStyle = (type) => {
        if(type === 'filled'){
             return{
                backgroundColor: snap.color,
                color: getContrastingColor(snap.color)
             }
        } else if(type === 'outline') {
          return {
            borderWidth: '1px',
            borderColor: snap.color,
            color: snap.color
          }
        }
    }
  return (
    <button className={`px-2 py-1.5 flex-1 rounded-md ${customeStyles} `} style={generateStyle(type)}  onClick={handleOnClick} >
        {title}
    </button>
  )
}

export default CustomeButton;