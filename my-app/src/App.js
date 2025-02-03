import styles from './App.module.css';
import { useState } from 'react';

export const App = () => {
	const currentDate = {
		date: [
			new Date().getDate(),
			new Date().getMonth() + 1,
			new Date().getFullYear(),
		].join('.'),
		time: [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()].join(
			':',
		),
	};
	let [isValueVaild, setIsValueVaild] = useState(false);
	let [value, setValue] = useState('');
	let [list, setList] = useState([]);
	let [error, setError] = useState('');
	let [noMarginText, setNoMarginText] = useState('Нет добавленных элементов');

	const onInputButtonClick = () => {
		let promptValue = prompt();
		if (promptValue.length < 3) {
			setIsValueVaild(false);
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setIsValueVaild(true);
			setValue((value = promptValue));
			setError('');
		}
	};

	const onAddButtonClick = () => {
		let updatedList = [...list, { id: Date.now(), value }];
		if (isValueVaild) {
			setList(updatedList);
			setError('');
			setValue('');
			setNoMarginText('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					onClick={onAddButtonClick}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{noMarginText && <p className={styles['no-margin-text']}>{noMarginText}</p>}
				<ul className={styles.list}>
					{' '}
					{list.map(({ id, value }) => (
						<li key={id} className={styles['list-item']}>
							{currentDate.date} {currentDate.time} {value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
