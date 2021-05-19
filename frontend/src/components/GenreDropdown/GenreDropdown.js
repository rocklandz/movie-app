import Select from 'react-select';

const GenreDropdown = ({ genres }) => {
  const genreOptions = genres.map((genre) => {
    return { value: genre, label: genre };
  });

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : '#111',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  return (
    <>
      {genreOptions && (
        <Select options={genreOptions} styles={customStyles} isMulti />
      )}
    </>
  );
};

export default GenreDropdown;
