import PropTypes from "prop-types";

const DropdownSelect = ({ onSortChange }) => {

    const options = ['Select an option', 'Lowest to Highest', 'Highest to Lowest'];

    const handleChange = (event) => {
        onSortChange(event.target.value);
    }

  return (
    <div>
      <label htmlFor="options">Sort By:</label>
      <select id="options" onChange={handleChange}>
        {options.map((option, index) => {
            <option key={index} value={option}>
                {option}
            </option>
        })}
      </select>
    </div>
  );
};

DropdownSelect.propTypes = {
    onSortChange: PropTypes.func.isRequired,
};

export default DropdownSelect
