import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react"

import SearchBar from '../components/SearchBar/SearchBar';

describe("test", () => {
    const mockChangeFilter = jest.fn();
    const mockChangeSearch = jest.fn();

    const props = {
        currentFilter: 'all',
        changeFilter: mockChangeFilter,
        currentSearch: '',
        changeSearch: mockChangeSearch,
        isAuthorFilterEnabled: true,
    };

    it('should render search bar with all filter', () => {
        render(<SearchBar {...props} />)
        expect(screen.getByLabelText(/all/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    })

    it('should handle search field changes', () => {
        render(<SearchBar {...props} />);
        const searchField = screen.getByLabelText(/Search/i);

        fireEvent.change(searchField, { target: { value: 'test search' } });
        expect(mockChangeSearch).toHaveBeenCalledWith(expect.anything());
        expect(screen.getByDisplayValue('test search')).toBeInTheDocument();
    });
})
