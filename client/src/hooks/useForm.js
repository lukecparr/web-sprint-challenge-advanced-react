import { useState } from 'react';

export const useForm = (initialValue) => {
	const [value, setValue] = useState(initialValue);

	const handleChanges = (e) => {
		setValue(e.target.value);
	}

	return [value, setValue];
};