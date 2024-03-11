export const isEmail = (s: string) =>
  s.match(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );



export const filterNullFieldsFromShips = (ships) => {
  const nullFields = {};
  if (ships.length > 0) {
    Object.keys(ships[0]).forEach((field) => {
      nullFields[field] = true;
    });
  }
  for (const ship of ships) {
    for (const field in ship) {
      if (ship[field] !== null) {
        nullFields[field] = false;
      }
    }
  }
  const fieldsNullForAllShips = Object.keys(nullFields).filter((field) => nullFields[field]);
  return fieldsNullForAllShips;
};