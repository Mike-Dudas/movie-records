import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });

    test("opens and closes the add movie modal", () => {
        render(<App />);

        userEvent.click(screen.getByRole("button", { name: /add new movie/i }));
        expect(screen.getByText("YouTube ID:")).toBeInTheDocument();

        const closeButtons = screen.getAllByRole("button", { name: /close/i });
        userEvent.click(closeButtons[closeButtons.length - 1]);

        expect(screen.queryByText("YouTube ID:")).not.toBeInTheDocument();
    });

    test("adds a new movie", () => {
        render(<App />);

        userEvent.click(screen.getByRole("button", { name: /add new movie/i }));

        const input = screen.getByLabelText(/youtube id/i);
        userEvent.type(input, "brand-new-movie");

        userEvent.click(screen.getByRole("button", { name: /save changes/i }));

        const trailers = screen.getAllByTitle(/youtube video player/i);

        expect(trailers[trailers.length - 1]).toHaveAttribute(
            "src",
            "https://www.youtube.com/embed/brand-new-movie",
        );
    });

    test("marks a movie as watched", () => {
        render(<App />);

        const watchedButtons = screen.getAllByRole("button", {
            name: /mark as watched/i,
        });

        userEvent.click(watchedButtons[0]);

        expect(
            screen.getAllByRole("button", { name: /mark as unwatched/i })[0],
        ).toBeInTheDocument();
    });

    test("deletes a movie", () => {
        render(<App />);

        userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

        const titleInput = screen.getByDisplayValue(/Kiki's Delivery Service/i);
        expect(titleInput).toBeInTheDocument();

        userEvent.click(screen.getByRole("button", { name: /delete/i }));

        expect(
            screen.queryByDisplayValue(/Kiki's Delivery Service/i),
        ).not.toBeInTheDocument();
    });

    test("edits a movie title", () => {
        render(<App />);

        userEvent.click(screen.getAllByRole("button", { name: /edit/i })[0]);

        const titleInput = screen.getByDisplayValue(/Kiki's Delivery Service/i);
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "Changed App Movie");

        userEvent.click(screen.getByRole("button", { name: /save/i }));

        expect(screen.getByText("Changed App Movie")).toBeInTheDocument();
    });
});
