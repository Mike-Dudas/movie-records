import { render, screen } from "@testing-library/react";
import { MovieRating } from "../src/components/MovieRating";
import { MovieTrailer } from "../src/components/MovieTrailer";
import { PlaySong } from "../src/components/PlaySong";

describe("MovieRating", () => {
    test("renders correct number of stars", () => {
        render(<MovieRating rating={7} />);
        expect(screen.getByText("⭐⭐⭐⭐✰")).toBeInTheDocument();
    });
});

describe("MovieTrailer", () => {
    test("renders YouTube iframe with correct src", () => {
        render(<MovieTrailer id="abc123" />);
        const iframe = screen.getByTitle(/youtube video player/i);
        expect(iframe).toHaveAttribute(
            "src",
            "https://www.youtube.com/embed/abc123",
        );
    });
});

describe("PlaySong", () => {
    test("renders Spotify iframe with correct src", () => {
        const { container } = render(
            <PlaySong song={{ id: "track123", name: "Song", by: "Artist" }} />,
        );

        const iframe = container.querySelector("iframe");

        expect(iframe).toHaveAttribute(
            "src",
            "https://open.spotify.com/embed?uri=spotify:track:track123",
        );
    });
});
