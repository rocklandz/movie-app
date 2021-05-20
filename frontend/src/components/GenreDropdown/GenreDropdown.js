import Select from 'react-select';

const GenreDropdown = ({ preSelect = [], genreList, setGenres }) => {
  const genreOptions = genreList.map((genre) => {
    return { value: genre, label: genre };
  });

  const preSelectOptions = preSelect.map((genre) => {
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

  const handleChange = (res) => {
    const computed = res.map((option) => option.value);
    setGenres(computed);
  };

  return (
    <>
      {genreOptions && (
        <Select
          onChange={handleChange}
          options={genreOptions}
          styles={customStyles}
          defaultValue={preSelectOptions}
          isMulti
        />
      )}
    </>
  );
};

export default GenreDropdown;
