import './FavoriteShowCard.css';
import { IoIosArrowDroprightCircle } from "react-icons/io";


const FavoriteShowCard = () => {
  return (
    <div>
      <div className="favoriteShowCard">
            <img src="https://static.tvmaze.com/uploads/images/medium_portrait/525/1313460.jpg" alt="" />
            <div className='favoriteText'>
            <h1>Hit Monkey</h1>
            <h3>Seasons: 2</h3>
            <h3>Episodes: 20</h3>
            <h3>Next Episode: October 31st, 2024</h3>
            </div>
            
            <IoIosArrowDroprightCircle size={80}/>
      </div>
    </div>
  )
}

export default FavoriteShowCard
