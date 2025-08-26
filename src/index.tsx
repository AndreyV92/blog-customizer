import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [globalSettings, setGlobalSettings] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': globalSettings.fontFamilyOption.value,
					'--font-size': globalSettings.fontSizeOption.value,
					'--font-color': globalSettings.fontColor.value,
					'--container-width': globalSettings.contentWidth.value,
					'--bg-color': globalSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				globalSettings={globalSettings}
				setGlobalSettings={setGlobalSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
