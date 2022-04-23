const isAllSelected = (attributes,SelectedItems,setValue) => {
    for (let key of attributes) if (!SelectedItems[key.name]) return;
    setValue({ disabled: false });
}

export default isAllSelected;