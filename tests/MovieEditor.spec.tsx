import type { Movie } from "../src/interfaces/movie";
import { MovieEditor } from "../src/components/MovieEditor";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MovieEditor Component", () => {
    const mockMovie: Movie = {
        id: "test-movie-123",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [{ id: "song1", name: "Test Song", by: "Test Artist" }],
        watched: {
            seen: true,
            liked: true,
            when: "2023-01-01",
        },
    };

    const mockChangeEditing = jest.fn();
    const mockEditMovie = jest.fn();
    const mockDeleteMovie = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <MovieEditor
                changeEditing={mockChangeEditing}
                movie={mockMovie}
                editMovie={mockEditMovie}
                deleteMovie={mockDeleteMovie}
            ></MovieEditor>,
        );
    });

    test("renders MovieEditor with initial movie data", () => {
        const title = screen.getByDisplayValue("The Test Movie");

        expect(title).toBeInTheDocument();
    });

    test("saves edited movie fields", () => {
        const titleInput = screen.getByDisplayValue("The Test Movie");
        userEvent.clear(titleInput);
        userEvent.type(titleInput, "Changed Title");

        const releaseInput = screen.getByDisplayValue("2020");
        userEvent.clear(releaseInput);
        userEvent.type(releaseInput, "2024");

        const ratingSelect = screen.getByDisplayValue("⭐⭐⭐⭐✰");
        userEvent.selectOptions(ratingSelect, "10");

        const descriptionInput = screen.getByDisplayValue(
            "A movie for testing",
        );
        userEvent.clear(descriptionInput);
        userEvent.type(descriptionInput, "Changed description");

        userEvent.click(screen.getByRole("button", { name: /save/i }));

        expect(mockEditMovie).toHaveBeenCalledWith(
            "test-movie-123",
            expect.objectContaining({
                title: "Changed Title",
                released: 2024,
                rating: 10,
                description: "Changed description",
            }),
        );

        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("calls changeEditing when cancel is clicked", () => {
        userEvent.click(screen.getByRole("button", { name: /cancel/i }));

        expect(mockChangeEditing).toHaveBeenCalledTimes(1);
    });

    test("calls deleteMovie when delete is clicked", () => {
        userEvent.click(screen.getByRole("button", { name: /delete/i }));

        expect(mockDeleteMovie).toHaveBeenCalledWith("test-movie-123");
    });
});
