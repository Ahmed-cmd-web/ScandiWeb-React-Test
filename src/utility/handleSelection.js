/** @format */

const handleSelection = (property, value, index, setValue) => {
  setValue({
    [property]: {
      value,
      index,
    },
  });
  return false;
};

export default handleSelection;
