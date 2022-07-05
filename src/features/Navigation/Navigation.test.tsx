/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import Navigation from './Navigation';
import { BrowserRouter } from "react-router-dom";


describe('<Navigation/>', () => {
	it('Navigation bar is rendered correctly', () => {
		const { queryAllByText } = render(<BrowserRouter><Navigation /></BrowserRouter>);
		expect(queryAllByText('Koti')).toBeTruthy();
	});
})
