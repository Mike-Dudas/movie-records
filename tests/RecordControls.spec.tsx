import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RecordControls } from "../src/components/RecordControls";

describe("RecordControls", () => {
    test("marks an unseen movie as watched", () => {
        const setMovieWatched = jest.fn();

        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                setMovieWatched={setMovieWatched}
                changeEditing={jest.fn()}
            />,
        );

        userEvent.click(
            screen.getByRole("button", { name: /mark as watched/i }),
        );

        expect(setMovieWatched).toHaveBeenCalledWith(true, false);
    });

    test("marks a watched movie as unwatched", () => {
        const setMovieWatched = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: true, when: "2024-01-01" }}
                setMovieWatched={setMovieWatched}
                changeEditing={jest.fn()}
            />,
        );

        userEvent.click(
            screen.getByRole("button", { name: /mark as unwatched/i }),
        );

        expect(setMovieWatched).toHaveBeenCalledWith(false, true);
    });

    test("toggles not liked to liked", () => {
        const setMovieWatched = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: false, when: null }}
                setMovieWatched={setMovieWatched}
                changeEditing={jest.fn()}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /not liked/i }));

        expect(setMovieWatched).toHaveBeenCalledWith(true, true);
    });

    test("toggles liked to not liked", () => {
        const setMovieWatched = jest.fn();

        render(
            <RecordControls
                watched={{ seen: true, liked: true, when: null }}
                setMovieWatched={setMovieWatched}
                changeEditing={jest.fn()}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /liked/i }));

        expect(setMovieWatched).toHaveBeenCalledWith(true, false);
    });

    test("calls changeEditing when edit is clicked", () => {
        const changeEditing = jest.fn();

        render(
            <RecordControls
                watched={{ seen: false, liked: false, when: null }}
                setMovieWatched={jest.fn()}
                changeEditing={changeEditing}
            />,
        );

        userEvent.click(screen.getByRole("button", { name: /edit/i }));

        expect(changeEditing).toHaveBeenCalledTimes(1);
    });
});
