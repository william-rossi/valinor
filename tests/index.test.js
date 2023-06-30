import Home from '../src/app/page';
import SearchBar from '../src/components/SearchBar/SearchBar';
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

describe("SearchBar", () => {
  it("Renderiza a barra de pesquisa", () => {
    render(<SearchBar />);
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
  });

  it('Pesquisa por "node" ao clicar no botão de pesquisa e valide 10 cards', async () => {
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