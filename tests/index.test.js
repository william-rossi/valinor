import Home from '../src/app/page';
import SearchBar from '../src/components/SearchBar/SearchBar';
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

describe("Home", () => {
  it("Renderiza a barra de pesquisa", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it('Busca por texto e valida quantidade de cards', async () => {
    render(<Home />);

    const searchBar = screen.getByTestId('search-bar');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchBar, { target: { value: 'node' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(10);
    });
  });
});
