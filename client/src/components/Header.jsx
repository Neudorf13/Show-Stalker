import './Header.css';
import SearchBar from './SearchBar';
import {Link} from "react-router-dom";


const Header = () => {

  return (
    <header className='header'>

        <img src="/vite.svg" alt="" />
        
        <SearchBar></SearchBar>

        

        <nav className='navOptions'>
            <li>
                <Link to="/home">Popular</Link>
            </li>
            <li>
                <Link to="/myShows">My Shows</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
        </nav>

    </header>
  )
}

export default Header