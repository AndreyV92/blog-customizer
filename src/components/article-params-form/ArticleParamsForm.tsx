import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	fontFamilyOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import clsx from 'clsx';
import { useOutsideClickClose } from '../../ui/select/hooks/useOutsideClickClose';

type TArticleFormProps = {
	globalSettings: ArticleStateType;
	setGlobalSettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	globalSettings,
	setGlobalSettings,
}: TArticleFormProps) => {
	const [localSettings, setLocalSettings] = useState(globalSettings);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: !isMenuOpen,
		onChange: setIsMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
	});

	const handleClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setGlobalSettings(localSettings);
	};

	const handleClickClearSettings = () => {
		setLocalSettings(defaultArticleState);
		setGlobalSettings(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleClickSubmit}>
					<Text as='h3' size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<div className={styles.mb50}>
						<Select
							selected={localSettings.fontFamilyOption}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={(option) =>
								setLocalSettings({
									...localSettings,
									['fontFamilyOption']: option,
								})
							}
						/>
					</div>
					<div className={styles.mb50}>
						<RadioGroup
							title='размер шрифта'
							name='fontSize'
							options={fontSizeOptions}
							selected={localSettings.fontSizeOption}
							onChange={(option) =>
								setLocalSettings({
									...localSettings,
									['fontSizeOption']: option,
								})
							}
						/>
					</div>
					<div className={styles.mb50}>
						<Select
							selected={localSettings.fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={(option) =>
								setLocalSettings({
									...localSettings,
									['fontColor']: option,
								})
							}
						/>
					</div>
					<div className={clsx(styles.pdWidthBorder, styles.mb50)}>
						<Select
							selected={localSettings.backgroundColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={(option) =>
								setLocalSettings({
									...localSettings,
									['backgroundColor']: option,
								})
							}
						/>
					</div>
					<div className={styles.mb50}>
						<Select
							selected={localSettings.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={(option) =>
								setLocalSettings({
									...localSettings,
									['contentWidth']: option,
								})
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='clear'
							onClick={handleClickClearSettings}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
