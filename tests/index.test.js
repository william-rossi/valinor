import Home from '../src/app/page';
import SearchBar from '../src/components/SearchBar/SearchBar';
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
    it("Renderiza a barra de pesquisa", () => {
        render(<SearchBar />);
        expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    });
});

test('Renderiza os 10 cards', async () => {
  render(<Home />);
  await waitFor(() => {
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(10);
  });
});