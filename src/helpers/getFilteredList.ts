export const getFilteredList = (list , key, query)  => {
  if(query) {
    return list.filter(item => item[key].toLowerCase().includes(query.toLowerCase().trim()))
  }

  return list
}

export const getFilteredListByOption = (
  list,
  selectedStatus: string | null,
  selectedGender: string | null,
  selectedSpecies: string | null ) => {

  return list.filter(character => {
    const matchesStatus = !selectedStatus || selectedStatus === "All"
        || character.status === selectedStatus;
    const matchesGender = !selectedGender || selectedGender === "All"
        || character.gender === selectedGender;
    const matchesSpecies = !selectedSpecies || selectedSpecies === "All"
        || character.species === selectedSpecies;

    return matchesStatus && matchesGender && matchesSpecies;
  });
}